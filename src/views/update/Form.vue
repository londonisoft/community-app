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
                                    <strong>App Update Setting</strong>
                                </div>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <div class='row'>
                                <b-col lg="12" sm="12">
                                    
                                        <ValidationObserver ref="form1"  v-slot="{ handleSubmit, reset }">
                                            <b-form  @submit.prevent="handleSubmit(register(update))" @reset.prevent="reset" >
                                                <div>
                                                    <p class="m-0 mb-2" style="font-weight: bold"> maintance Mode </p>
                                                    <b-form-checkbox v-model="update.maintance" size="md" name="check-button" switch>
                                                        <span v-if="update.maintance">ON</span>
                                                        <span v-else>OF</span>
                                                    </b-form-checkbox>
                                                </div>
                                                <div>
                                                    <p class="m-0 mb-2" style="font-weight: bold">  Task ON OFF  </p>
                                                    <b-form-checkbox v-model="update.task_on_off" size="md" name="check-button" switch>
                                                        <span v-if="update.task_on_off">ON</span>
                                                        <span v-else>OF</span>
                                                    </b-form-checkbox>
                                                </div>
                                                <div class='row'>
                                                    <b-col lg="6" sm="6">
                                                        <ValidationProvider name="Version" vid="version" rules="required">
                                                            <b-form-group
                                                            class="row"
                                                            label-cols-sm="12"
                                                            label-for="formData"
                                                            slot-scope="{ valid, errors }"
                                                            >
                                                            <template v-slot:label>
                                                            Current App Version
                                                            </template>
                                                            <b-form-input
                                                                type="text"
                                                                id="version"
                                                                v-model="update.version"
                                                                :state="errors[0] ? false : (valid ? true : null)"
                                                                ></b-form-input>
                                                            <div class="invalid-feedback">
                                                                {{ errors[0] }}
                                                            </div>
                                                            </b-form-group>
                                                        </ValidationProvider>
                                                    </b-col>
                                                    <b-col lg="6" sm="6">
                                                        <ValidationProvider name="Version" vid="dlink" rules="required">
                                                            <b-form-group
                                                            class="row"
                                                            label-cols-sm="12"
                                                            label-for="formData"
                                                            slot-scope="{ valid, errors }"
                                                            >
                                                            <template v-slot:label>
                                                            App Download link
                                                            </template>
                                                            <b-form-input
                                                                id="dlink"
                                                                v-model="update.dlink"
                                                                :state="errors[0] ? false : (valid ? true : null)"
                                                                ></b-form-input>
                                                            <div class="invalid-feedback">
                                                                {{ errors[0] }}
                                                            </div>
                                                            </b-form-group>
                                                        </ValidationProvider>
                                                    </b-col>
                                                </div>
                                                <div class="text-right">
                                                    <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">Update</b-button>
                                                </div>
                                            </b-form>
                                        </ValidationObserver>
                                    
                                </b-col>                                
                            </div>
                        </CCardBody>
                    </CCard>
                </b-col>
                <b-col lg="12" sm="12">
                    <CCard>
                        <CCardHeader>
                            <div class="row">
                                <div class="col-md-6">
                                    <strong>App Setting's</strong>
                                </div>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <div class='row'>
                                <b-col lg="12" sm="12">
                                    <ValidationObserver ref="form2"  v-slot="{ handleSubmit, reset }">
                                        <b-form  @submit.prevent="handleSubmit(register(setting))" @reset.prevent="reset" >
                                            <div class='row'>
                                                <b-col lg="6" sm="6">
                                                    <ValidationProvider name="Main Notice Box" vid="notice" rules="required">
                                                        <b-form-group
                                                        class="row"
                                                        label-cols-sm="12"
                                                        label-for="formData"
                                                        slot-scope="{ valid, errors }"
                                                        >
                                                        <template v-slot:label>
                                                        Main Notice Box
                                                        </template>
                                                        <b-form-textarea
                                                            type="number"
                                                            id="notice"
                                                            v-model="setting.notice"
                                                            :state="errors[0] ? false : (valid ? true : null)"
                                                            ></b-form-textarea>
                                                        <div class="invalid-feedback">
                                                            {{ errors[0] }}
                                                        </div>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                                <b-col lg="6" sm="6">
                                                    <ValidationProvider name="Payment Notice Box" vid="payment_notich" rules="required">
                                                        <b-form-group
                                                        class="row"
                                                        label-cols-sm="12"
                                                        label-for="formData"
                                                        slot-scope="{ valid, errors }"
                                                        >
                                                        <template v-slot:label>
                                                        Payment Notice Box
                                                        </template>
                                                        <b-form-textarea
                                                            type="number"
                                                            id="payment_notich"
                                                            v-model="setting.payment_notich"
                                                            :state="errors[0] ? false : (valid ? true : null)"
                                                            ></b-form-textarea>
                                                        <div class="invalid-feedback">
                                                            {{ errors[0] }}
                                                        </div>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </b-col>
                                            </div>
                                            <div class="text-right">
                                                <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">Update</b-button>
                                            </div>
                                        </b-form>
                                    </ValidationObserver>
                                </b-col>                                
                            </div>
                        </CCardBody>
                    </CCard>
                </b-col>
                <b-col lg="12" sm="12">
                    <CCard>
                        <CCardHeader>
                            <div class="row">
                                <div class="col-md-6">
                                    <strong>Apps About Setting</strong>
                                </div>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <div class='row'>
                                <b-col lg="12" sm="12">
                                    
                                        <ValidationObserver ref="form5"  v-slot="{ handleSubmit, reset }">
                                            <b-form  @submit.prevent="handleSubmit(register(about))" @reset.prevent="reset" >
                                                <div class='row'>
                                                    <b-col lg="12" sm="12">
                                                        <ValidationProvider name="About Us" vid="aboutus" rules="required">
                                                            <b-form-group
                                                            class="row"
                                                            label-cols-sm="12"
                                                            label-for="formData"
                                                            slot-scope="{ valid, errors }"
                                                            >
                                                            <template v-slot:label>
                                                            About Us
                                                            </template>
                                                            <b-form-textarea
                                                                id="aboutus"
                                                                v-model="about.aboutus"
                                                                :state="errors[0] ? false : (valid ? true : null)"
                                                                ></b-form-textarea>
                                                            <div class="invalid-feedback">
                                                                {{ errors[0] }}
                                                            </div>
                                                            </b-form-group>
                                                        </ValidationProvider>
                                                    </b-col>
                                                </div>
                                                <div class="text-right">
                                                    <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">Update</b-button>
                                                </div>
                                            </b-form>
                                        </ValidationObserver>
                                    
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

export default {
  props: ['id'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  created () {
	this.getData()
  },
  data () {
    return {
      update: {
        maintance: false,
        task_on_off: false,
        version: '',
        dlink: ''
      },
      setting: {
        notice: '',
        convert_notice: '',
        payment_notich: ''
      },
      about: {
        aboutus: '',
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
        RestApi.getData(baseUrl, 'api/app-update/show').then(response => {
            if (response.success) {
                this.update = {
                    maintance: response.data.maintance === '1' ? true : false,
                    task_on_off: response.data.task_on_off === '1' ? true : false,
                    version: response.data.version,
                    dlink: response.data.dlink
                }
                this.setting = {
                    notice: response.data.notice,
                    convert_notice: response.data.convert_notice,
                    payment_notich: response.data.payment_notich
                }
                this.about = {
                    aboutus: response.data.aboutus
                }
            }
            this.$store.dispatch('mutedLoad', { loading: false })
        })
    },
    async register (Obj) {
        this.$store.dispatch('mutedLoad', { loading: true })
        let result = null
        result = await RestApi.postData(baseUrl, `api/app-update/update`, Obj)
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
