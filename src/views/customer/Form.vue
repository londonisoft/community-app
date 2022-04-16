<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="12" sm="12">
                <b-overlay :show="loading">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(formSubmit)" @reset.prevent="reset" >
                            <b-row>
                              <b-col>
                                  <Input @return-value="setReturnData({ name: $event})" :input="{ cols: 12, type: 'text', name: 'name', rules: 'required', vmodel: formData.name }"/>
                              </b-col>
                              <b-col>
                                  <Input @return-value="setReturnData({ mobile: $event})" :input="{ cols: 12, type: 'text', name: 'mobile', rules: 'required', vmodel: formData.mobile }"/>
                              </b-col>
                            </b-row>
                            <b-row>
                                <b-col md =6 lg =6 sm =6>
                                    <Select @return-value="setReturnData({ division_id: $event})" :input="{ cols: 12, type: 'text', name: 'division_id', rules: 'required', vmodel: formData.division_id, options: divisionList }"/>
                                </b-col>
                                <b-col md =6 lg =6 sm =6>
                                    <Select @return-value="setReturnData({ district_id: $event})" :input="{ cols: 12, type: 'text', name: 'district_id', rules: 'required', vmodel: formData.district_id, options: districtList }"/>
                                </b-col>
                                <b-col md =6 lg =6 sm =6>
                                    <Select @return-value="setReturnData({ upazilla_id: $event})" :input="{ cols: 12, type: 'text', name: 'upazilla_id', rules: 'required', vmodel: formData.upazilla_id, options: upazillaList }"/>
                                </b-col>
                                <b-col>
                                  <Input @return-value="setReturnData({ pay_amount: $event})" :input="{ cols: 12, type: 'text', name: 'pay_amount', rules: 'required', vmodel: formData.pay_amount }"/>
                                </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="6" lg="6" md="6">
                                  <TextArea @return-value="setReturnData({ bazar_name: $event})" :input="{ cols: 12, type: 'text', name: 'bazar_name', rules: '', vmodel: formData.bazar_name }"/>
                              </b-col>
                            </b-row>
                            <div class="row mt-4 mb-3">
                                <div class="col-md-12 text-right">
                                    <button class="btn btn-primary mr-3" @click="show = false">{{ saveBtnName }}</button>
                                    <button type="button" class="btn btn-danger" @click="$bvModal.hide('modal-1')">close</button>
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
import { ValidationObserver } from 'vee-validate'
import Input from '../../components/common/Input'
import TextArea from '../../components/common/TextArea'
import Select from '../../components/common/Select'
import commonForm from '@/mixins/common-form'

export default {
  mixins: [commonForm],
  props: ['id'],
  components: {
    ValidationObserver,
    Input,
    TextArea,
    Select
  },
  created () {
      if (this.id) {
        this.formData = this.getItem()
      }
  },
  data () {
    return {
      formData: {
        name: '',
        mobile: '',
        division_id: '',
        district_id: '',
        upazilla_id: '',
        pay_amount: '',
        bazar_name: ''
      },
      districtList: [],
      upazillaList: [],
      genderList: [
          { value: "Male", text: 'Male' },
          { value: "Female", text: 'Female' }
      ]
    }
  },
  watch: {
    'formData.division_id': function (n, o) {
        if (n !== o) {
            this.districtList =  this.$store.state.commonObj.districtList.filter(item => item.division_id === n)
        }
    },
    'formData.district_id': function (n, o) {
        if (n !== o) {
            this.upazillaList = this.$store.state.commonObj.upazillaList.filter(item => item.district_id === n)
        }
    }
  },
  computed: {
      divisionList () {
          return this.$store.state.commonObj.divisionList
      }
  },
  methods: {
    formSubmit () {
      const result = this.submitHandler('api/customer/store', 'api/customer/update', this.formData)
      result.then(response => {
        this.resultProcess(response)
      })
    }
  }
}
</script>
