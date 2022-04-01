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
                                                        <div class="col-md-12">
                                                            <h5>Ads Setting</h5><hr>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Add Banner" vid="admob_banner" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="admob_banner"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Add Banner
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="admob_banner"
                                                                    v-model="formData.admob_banner"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Add Inter" vid="admob_inter" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="admob_inter"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Add Inter
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="admob_inter"
                                                                    v-model="formData.admob_inter"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Add Native" vid="admob_native" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="admob_native"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Add Native
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="admob_native"
                                                                    v-model="formData.admob_native"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="App ID" vid="app_id" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="app_id"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                App ID
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="app_id"
                                                                    v-model="formData.app_id"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                             <ValidationProvider name="Show Ads" vid="show_ads" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="show_ads"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Show Ads
                                                                </template>
                                                                <b-form-checkbox v-model="formData.show_ads" size="md" name="check-button" switch>
                                                                    <span v-if="formData.show_ads">ON</span>
                                                                    <span v-else>OF</span>
                                                                </b-form-checkbox>
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
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <h5>Custom Ads Setting</h5><hr>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Add Text (Video Play)" vid="ad_text_video_play" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="ad_text_video_play"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Add Text (Video Play)
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="ad_text_video_play"
                                                                    v-model="formData.ad_text_video_play"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="As Text Video Play URL" vid="ad_text_video_play_url" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="ad_text_video_play_url"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                As Text Video Play URL
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="ad_text_video_play_url"
                                                                    v-model="formData.ad_text_video_play_url"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                             <ValidationProvider name="Show Ads" vid="show_ads_custom" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="show_ads_custom"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Show Ads
                                                                </template>
                                                                <b-form-checkbox v-model="formData.show_ads_custom" size="md" name="check-button" switch>
                                                                    <span v-if="formData.show_ads_custom">ON</span>
                                                                    <span v-else>OF</span>
                                                                </b-form-checkbox>
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
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <h5>Tab Links Setting</h5><hr>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Home Score Link" vid="home_score_link" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="home_score_link"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Home Score Link
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="home_score_link"
                                                                    v-model="formData.home_score_link"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Live Score Link" vid="live_score_link" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="live_score_link"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Live Score Link
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="live_score_link"
                                                                    v-model="formData.live_score_link"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Schedule Link" vid="schedule_link" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="schedule_link"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Schedule Link
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="schedule_link"
                                                                    v-model="formData.schedule_link"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Update Link" vid="update_link" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="update_link"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Update Link
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="update_link"
                                                                    v-model="formData.update_link"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
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
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <h5>Update And Notice Setting</h5><hr>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Update App Link" vid="update_app_link" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="update_app_link"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Update App Link
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="update_app_link"
                                                                    v-model="formData.update_app_link"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Video PLay Notice" vid="video_play_notice" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="video_play_notice"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Video PLay Notice
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="video_play_notice"
                                                                    v-model="formData.video_play_notice"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                         <div class="col-md-6">
                                                        <ValidationProvider name="Show TV" vid="show_tv" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="show_tv"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Show TV
                                                                </template>
                                                                <b-form-checkbox v-model="formData.show_tv" size="md" name="check-button" switch>
                                                                    <span v-if="formData.show_tv">ON</span>
                                                                    <span v-else>OF</span>
                                                                </b-form-checkbox>
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
        policy: '',
        policy_social: '',
        notice_social: '',
        about_social: '',
        mycash_message: '',
        online_pay_message: ''
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
                const tmp = Object.assign(response.data,
                { 
                    show_ads: response.data.show_ads === 1 ? true : false,
                    show_ads_custom: response.data.show_ads_custom === 1 ? true : false,
                    show_tv: response.data.show_tv === 1 ? true : false
                })
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
