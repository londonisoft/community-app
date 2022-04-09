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
                              <b-col>
                                  <Input @return-value="setReturnData({ email: $event})" :input="{ cols: 12, type: 'text', name: 'email', rules: '', vmodel: formData.email }"/>
                              </b-col>
                              <b-col>
                                  <Input @return-value="setReturnData({ nid: $event})" :input="{ cols: 12, type: 'text', name: 'nid', rules: '', vmodel: formData.nid }"/>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col>
                                  <Input @return-value="setReturnData({ loan_amount: $event})" :input="{ cols: 12, type: 'text', name: 'loan_amount', rules: '', vmodel: formData.loan_amount }"/>
                              </b-col>
                              <b-col>
                                  <Radio @return-value="setReturnData({ gender: $event})" :input="{ cols: 12, type: 'text', name: 'gender', rules: 'required', vmodel: formData.gender, options: genderList }"/>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col sm="6" lg="6" md="6">
                                  <TextArea @return-value="setReturnData({ address: $event})" :input="{ cols: 12, type: 'text', name: 'address', rules: '', vmodel: formData.address }"/>
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
import Radio from '../../components/common/Radio'
import commonForm from '@/mixins/common-form'

export default {
  mixins: [commonForm],
  props: ['id'],
  components: {
    ValidationObserver,
    Input,
    TextArea,
    Radio
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
        email: '',
        nid: '',
        gender: 'Male',
        loan_amount: '',
        address: ''
      },
      genderList: [
          { value: "Male", text: 'Male' },
          { value: "Female", text: 'Female' }
      ]
    }
  },
  computed: {
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
