<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="10" offset-lg="1" sm="12">
                <b-overlay :show="loading">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                        <ValidationProvider name="Category" vid="category_id" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="category_id"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Category <span class="text-danger">*</span>
                            </template>
                            <b-form-select
                                id="category_id"
                                rows="6"
                                v-model="formData.category_id"
                                :state="errors[0] ? false : (valid ? true : null)"
                                :options="categoryList"
                                ></b-form-select>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Home Interstitial" vid="home_nterstitial" rules="">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="home_nterstitial"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Home Interstitial
                            </template>
                            <b-form-checkbox v-model="formData.home_nterstitial" size="md" name="check-button" switch>
                                <span v-if="formData.home_nterstitial">ON</span>
                                <span v-else>OF</span>
                            </b-form-checkbox>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name=" Details Interstitial" vid="details_interstitial" rules="">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="details_interstitial"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                             Details Interstitial
                            </template>
                            <b-form-checkbox v-model="formData.details_interstitial" size="md" name="check-button" switch>
                                <span v-if="formData.details_interstitial">ON</span>
                                <span v-else>OF</span>
                            </b-form-checkbox>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Ads off full app" vid="ads_off" rules="">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="ads_off"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                             Ads off full app
                            </template>
                            <b-form-checkbox v-model="formData.ads_off" size="md" name="check-button" switch>
                                <span v-if="formData.ads_off">ON</span>
                                <span v-else>OF</span>
                            </b-form-checkbox>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Ads app url" vid="ads_app_url" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="ads_app_url"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Ads app url <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="ads_app_url"
                                rows="6"
                                v-model="formData.ads_app_url"
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
        category_id: 0,
        ads_app_url: '',
        home_nterstitial: false,
        details_interstitial: false,
        ads_off: false
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
        const data = JSON.parse(JSON.stringify(item))
        return Object.assign(data, {
            home_nterstitial: parseInt(data.home_nterstitial) === 1 ? true : false,
            details_interstitial: parseInt(data.details_interstitial) === 1 ? true : false,
            ads_off: parseInt(data.ads_off) === 1 ? true : false
        })
    },
    async register () {
          this.$store.dispatch('mutedLoad', { loading: true, listReload: false })
        let result = null
        if (this.id) {
            result = await RestApi.putData(baseUrl, `${'api/channel/update'}/${this.id}`, this.formData)
        } else {
            result = await RestApi.postData(baseUrl,'api/channel/store', this.formData)
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
