<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="12" sm="12">
                <b-overlay :show="false">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(formSubmit)" @reset.prevent="reset" >
                            <b-row>
                              <b-col>
                                  <Input @return-value="setReturnData({ name: $event})" :input="{ cols: 12, type: 'text', name: 'name', rules: 'required', vmodel: formData.name }"/>
                              </b-col>
                              <b-col>
                                  <Input @return-value="setReturnData({ phone_no: $event})" :input="{ cols: 12, type: 'text', name: 'phone_no', rules: 'required', vmodel: formData.phone_no }"/>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col>
                                  <Input @return-value="setReturnData({ email: $event})" :input="{ cols: 12, type: 'email', name: 'email', rules: 'required|email', vmodel: formData.email }"/>
                              </b-col>
                              <b-col>
                                  <Input @return-value="setReturnData({ password: $event})" :input="{ cols: 12, type: 'password', name: 'password', rules: id ? '' : 'required', vmodel: formData.password }"/>
                              </b-col>
                            </b-row>
                            <b-row>
                              <b-col md="12">
                                  <Checkbox @return-value="setReturnData({ roles: $event})" :input="{ cols: 12, name: 'roles', rules: 'required', vmodel: formData.roles, options: roleList }"/>
                              </b-col>
                            </b-row>
                            <div class="row mt-4 mb-3">
                                <div class="col-md-12 text-right">
                                    <button class="vodal-confirm-btn mr-3" @click="show = false">Save</button>
                                    <button type="button" class="vodal-cancel-btn" @click="$bvModal.hide('modal-1')">close</button>
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
import Select from '../../components/common/Select'
import Radio from '../../components/common/Radio'
import TextArea from '../../components/common/TextArea'
import Checkbox from '../../components/common/Checkbox'
import commonForm from '@/mixins/common-form'

export default {
  mixins: [commonForm],
  props: ['id'],
  components: {
    ValidationObserver,
    Input,
    Select,
    Radio,
    TextArea,
    Checkbox
  },
  created () {
      if (this.id) {
        const tmp = this.getItem()
        const roles = tmp.roles.map(item => {
          return item.name
        })
        this.formData = Object.assign({}, tmp, { roles: roles })
      }
  },
  data () {
    return {
      formData: {
        name: '',
        phone_no: '',
        email: '',
        password: '',
        roles: []
      }
    }
  },
  computed: {
    roleList () {
      return this.$store.state.commonObj.roleList
    }
  },
  methods: {
    formSubmit () {
      const result = this.submitHandler('api/users/store', 'api/users/update', this.formData)
      result.then(response => {
        this.resultProcess(response)
      })
    }
  }
}
</script>
