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
                            </b-row>
                            <b-row>
                              <b-col>
                                  <Checkbox @return-value="setReturnData({ permission: $event})" :input="{ cols: 12, name: 'permission', rules: 'required', vmodel: formData.permission, options: permissionList }"/>
                              </b-col>
                            </b-row>
                            <div class="row mt-4 mb-3">
                                <div class="col-md-12 text-right">
                                    <button class="vodal-confirm-btn mr-3" @click="show = false">{{ saveBtnName }}</button>
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
import Checkbox from '../../components/common/Checkbox.vue'
import commonForm from '@/mixins/common-form'

export default {
  mixins: [commonForm],
  props: ['id'],
  components: {
    ValidationObserver,
    Input,
    Checkbox
  },
  created () {
      if (this.id) {
        const tmp = this.getItem()
        const permission = tmp.permissions.map(item => {
          return item.name
        })
        this.formData = Object.assign({}, tmp, { permission: permission })
      }
  },
  data () {
    return {
      formData: {
        name: '',
        permission: []
      }
    }
  },
  computed: {
    permissionList () {
      return this.$store.state.commonObj.permissionList
    }
  },
  methods: {
    formSubmit () {
      const result = this.submitHandler('api/role/store', 'api/role/update', this.formData)
      result.then(response => {
        this.resultProcess(response)
      })
    }
  }
}
</script>
