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
                            <b-col offset=3 md =6 lg =6 sm =6>
                                <ValidationProvider name="Customer Id" vid="cust_id" rules="">
                                    <b-form-group
                                    class="row"
                                    label-cols-sm="12"
                                    label-for="cust_id"
                                    slot-scope="{ valid, errors }"
                                    >
                                    <template v-slot:label>
                                    Customer Id <span class="text-danger">*</span>
                                    </template>
                                    <b-form-input
                                        id="cust_id"
                                        @keyup="getCustData()"
                                        v-model="formData.cust_id"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        >
                                        </b-form-input>
                                    <div class="invalid-feedback">
                                        {{ errors[0] }}
                                    </div>
                                </b-form-group>
                                </ValidationProvider>
                            </b-col>
                        </b-row>
                        <b-row>
                             <b-col md =12 lg =12 sm =12>
                                <table class="table table-bordered table-sm">
                                    <tr>
                                        <td width="50%">Customer Id</td>
                                        <td>{{ formData.cust_id }}</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>{{ formData.name }}</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile</td>
                                        <td>{{ formData.mobile }}</td>
                                    </tr>
                                    <tr>
                                        <td>Pay Amount</td>
                                        <td>{{ formData.amount }}</td>
                                    </tr>
                                </table>
                            </b-col>
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
  },
  mounted(){
    this.options = this.customerList.map(function (x){
        return Object.assign({}, item, { text: `${item.text} (${item.cust_id })` })
    });
  },
  data () {
    return {
      saveBtnName: this.id ? 'Update' : 'Save',
      rerender: 1,
      formData: {
        customer_id: '',
        amount: '',
        pay_date: '',
        transaction_no: ''
      },
      options: []
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
    getCustData () {
        if (this.formData.cust_id.length !== 4) {
            return false
        }
        this.$store.dispatch('mutedLoad', { loading: true})
        RestApi.getData(baseUrl, 'api/payment/user-data', { cust_id : this.formData.cust_id }).then(response => {
            if (response.success) {
                this.formData = Object.assign(response.data, { amount: response.data.pay_amount })
                this.rerender = this.rerender + 1
            } else {
                this.formData = {}
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
             iziToast.error({
                title: 'Error',
                message: result.message
            })
        }
    }
  }
}
</script>
