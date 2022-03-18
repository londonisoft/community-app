<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
           <b-overlay :show="loading">
                <b-row>
                    <b-col lg="12" sm="12">
                        <CCard>
                            <CCardHeader>
                                <div class="row">
                                    <div class="col-md-6">
                                        <strong>Main Setting</strong>
                                    </div>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <div>
                                    <b-col lg="12" sm="12">
                                        <b-overlay :show="false">
                                            <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                                                <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Refer Bonus (Tk)" vid="refer_bonus" rules="required">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Refer Bonus (Tk) <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="refer_bonus"
                                                                    v-model="formData.refer_bonus"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Add Code" vid="add_code" rules="required">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="add_code"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Add Code <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="add_code"
                                                                    v-model="formData.add_code"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Notice" vid="notice" rules="required">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="notice"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Notice <span class="text-danger">*</span>
                                                                </template>
                                                                <VueEditor
                                                                    type="text"
                                                                    id="notice"
                                                                    rows="6"
                                                                    v-model="formData.notice"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></VueEditor>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="About" vid="about" rules="required">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="about"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                About <span class="text-danger">*</span>
                                                                </template>
                                                                <VueEditor
                                                                    type="text"
                                                                    id="about"
                                                                    rows="6"
                                                                    v-model="formData.about"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></VueEditor>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Policy" vid="policy" rules="required">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="policy"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Policy <span class="text-danger">*</span>
                                                                </template>
                                                                <VueEditor
                                                                    type="text"
                                                                    id="policy"
                                                                    v-model="formData.policy"
                                                                    rows="6"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></VueEditor>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-12 text-right">
                                                            <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">{{ saveBtnName }}</b-button>
                                                        </div>
                                                    </div>
                                                </b-form>
                                            </ValidationObserver>
                                        </b-overlay>
                                    </b-col>
                                </div>
                            </CCardBody>
                        </CCard>
                    </b-col>
                </b-row>
           </b-overlay>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import iziToast from 'izitoast';
import { VueEditor } from "vue2-editor";
export default {
  props: ['id'],
  components: {
    ValidationObserver,
    ValidationProvider,
    VueEditor
  },
  created () {
      this.getData()
  },
  data () {
    return {
      saveBtnName: "Update",
      formData: {
        refer_bonus: '',
        add_code: '',
        notice: '',
        about: '',
        policy: ''
      },
      editId: ''
    }
  },
  computed: {
	loading () {
		return this.$store.state.static.loading
	}
  },
  methods: {
    getData () {
        this.$store.dispatch('mutedLoad', { loading: true})
        RestApi.getData(baseUrl, 'api/setting/show').then(response => {
            if (response.success) {
                this.formData = response.data
            }
            this.$store.dispatch('mutedLoad', { loading: false })
        })
    },
    async register () {
        this.$store.dispatch('mutedLoad', { loading: true })
        let result = null
        result = await RestApi.postData(baseUrl, `api/setting/update`, this.formData)
        this.$store.dispatch('mutedLoad', { loading: false })
        if (result.success) {
			iziToast.success({
				title: 'Success',
				message: result.message
			})
        } else {
            this.$refs.form.setErrors(result.errors)
        }
    }
  }
}
</script>
