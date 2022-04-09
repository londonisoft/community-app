<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="10" offset-lg="1" sm="12">
                <b-overlay :show="loading">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                        <b-row>
                            <b-col md =6 lg =6 sm =6>
                                <Input @return-value="setReturnData({ amount: $event})" :input="{ cols: 12, type: 'text', name: 'amount', rules: 'required', vmodel: formData.amount }"/>
                            </b-col>
                            <b-col md =6 lg =6 sm =6>
                                <Input @return-value="setReturnData({ pay_date: $event})" :input="{ cols: 12, type: 'date', name: 'pay_date', rules: 'required', vmodel: formData.pay_date }"/>
                            </b-col>
                        </b-row>
                        <b-row>
                        </b-row>
                        <div class="row">
                            <div class="col-sm-3"></div>
                            <div class="col text-right">
                            <b-button type="submit" variant="primary" class="mr-2">{{ saveBtnName }}</b-button>
                            &nbsp;
                            <b-button variant="danger" class="mr-1" @click="$bvModal.hide('modal-1')">Close</b-button>
                            </div>
                        </div>
                        </b-form>
                    </ValidationObserver>
                </b-overlay>
            </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import iziToast from 'izitoast';
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import commonForm from '@/mixins/common-form'

export default {
  props: ['id'],
  mixins: [commonForm],
  components: {
    ValidationObserver,
    ValidationProvider,
    Input,
    Select
  },
  created () {
      if (this.id) {
          this.formData = this.getItem()
      }
  },
  mounted(){
    this.customerList.map(function (x){
      return x.text = x.text + ' (' + x.cust_id + ')';
    });
  },
  data () {
    return {
      saveBtnName: this.id ? 'Update' : 'Save',
      formData: {
        customer_id: '',
        payment_method: '',
        account_num: '',
        amount: '',
        pay_date: '',
        transaction_no: ''
      },
      methodList: [
          { value: "BKash", text: 'BKash' },
          { value: "Rocket", text: 'Rocket' },
          { value: "Nogod", text: 'Nogod' },
          { value: "Cash", text: 'Cash' },
          { value: "Bank", text: 'Bank' },
          { value: "Cheque", text: 'Cheque' }
      ]
    }
  },
  computed: {
      customerList () {
        return this.$store.state.commonObj.customerList
      },
      loading () {
        return this.$store.state.static.loading
      }
  },
  methods: {
    loadUser () {
        const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
        this.$store.dispatch('mutedLoad', { loading: true})
        RestApi.getData(baseUrl, 'api/payment/list', params).then(response => {
            if (response.success) {
                this.$store.dispatch('setList', response.data.data)
                this.paginationData(response.data)
            }
            this.$store.dispatch('mutedLoad', { loading: false })
        })
    },
    getItem () {
        const item = this.$store.state.list.find(item => item.id === parseInt(this.id))
        return JSON.parse(JSON.stringify(item))
    },
    async register () {
          this.$store.dispatch('mutedLoad', { loading: true, listReload: false })
        let result = null
        if (this.id) {
            result = await RestApi.putData(baseUrl, `${'api/payment/update'}/${this.id}`, this.formData)
        } else {
            result = await RestApi.postData(baseUrl,'api/payment/store', this.formData)
        }
        this.$store.dispatch('mutedLoad', { loading: false, listReload: true })
        this.$store.dispatch('dropdownLoad', { hasDropdownLoaded: false })
        if (result.success) {
            if (!this.id) {
                this.formData.content = ''
            }
            iziToast.success({
                title: 'Success',
                message: result.message
            })
             this.$bvModal.hide('modal-1')
        } else {
            this.$refs.form.setErrors(result.errors)
        }
    }
  }
}
</script>
