<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="10" offset-lg="1" sm="12">
                <b-overlay :show="loading">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                        <ValidationProvider name="Name" vid="name" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Name <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="name"
                                rows="6"
                                v-model="formData.name"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Fees" vid="fees" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Fees <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="fees"
                                rows="6"
                                v-model="formData.fees"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Earn Amount" vid="earn_amount" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Earn Amount <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="earn_amount"
                                rows="6"
                                v-model="formData.earn_amount"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Total Work" vid="total_work" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Total Work <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="total_work"
                                rows="6"
                                v-model="formData.total_work"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
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
export default {
  props: ['id'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  created () {
      if (this.id) {
          this.formData = this.getItem()
      }
  },
  data () {
    return {
      saveBtnName: this.id ? 'Update' : 'Save',
      formData: {
        name: '',
        min_dollar: ''
      }
    }
  },
  computed: {
      categoryList () {
        return this.$store.state.commonObj.categoryList
      },
      loading () {
        return this.$store.state.static.loading
      }
  },
  methods: {
    getItem () {
        const item = this.$store.state.list.find(item => item.id === parseInt(this.id))
        return JSON.parse(JSON.stringify(item))
    },
    async register () {
          this.$store.dispatch('mutedLoad', { loading: true, listReload: false })
        let result = null
        if (this.id) {
            result = await RestApi.putData(baseUrl, `${'api/package/update'}/${this.id}`, this.formData)
        } else {
            result = await RestApi.postData(baseUrl,'api/package/store', this.formData)
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
