<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="10" offset-lg="1" sm="12">
                <b-overlay :show="loading">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                        <ValidationProvider name="Title" vid="title" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Title <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="title"
                                rows="6"
                                v-model="formData.title"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Ads ID" vid="app_id" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                              App ID<span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="app_id"
                                rows="6"
                                v-model="formData.app_id"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Banner" vid="banner" rules="">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                              Banner
                            </template>
                            <b-form-input
                                id="banner"
                                rows="6"
                                v-model="formData.banner"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Interstitial" vid="interstitial" rules="">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                              Interstitial
                            </template>
                            <b-form-input
                                id="interstitial"
                                rows="6"
                                v-model="formData.interstitial"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Rewared" vid="rewared" rules="">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                              Rewared
                            </template>
                            <b-form-input
                                id="rewared"
                                rows="6"
                                v-model="formData.rewared"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Native" vid="native_ads" rules="">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                              Native
                            </template>
                            <b-form-input
                                id="native_ads"
                                rows="6"
                                v-model="formData.native_ads"
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
        title: null,
        app_id: null,
        banner: null,
        interstitial: null,
        rewared: null,
        native_ads: null
      }
    }
  },
  computed: {
      loading () {
        return this.$store.state.static.loading
      }
  },
  methods: {
    getItem () {
        const item = this.$store.state.list.find(item => item.id === parseInt(this.id))
        return JSON.parse(JSON.stringify({...item, vpn_on: item.vpn_on == 1 ? true : false}))
    },
    async register () {
          this.$store.dispatch('mutedLoad', { loading: true, listReload: false })
        let result = null
        if (this.id) {
            result = await RestApi.putData(baseUrl, `${'api/ads-networds/update'}/${this.id}`, this.formData)
        } else {
            result = await RestApi.postData(baseUrl,'api/ads-networds/store', this.formData)
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
