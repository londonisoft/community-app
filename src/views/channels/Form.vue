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
                        <ValidationProvider name="Channel Name" vid="channel_name" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="channel_name"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Channel Name <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="channel_name"
                                rows="6"
                                v-model="formData.channel_name"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Channel Link" vid="channel_link" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="channel_link"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Channel Link <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="channel_link"
                                rows="6"
                                v-model="formData.channel_link"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Channel Logo" vid="channel_logo" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="channel_logo"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Channel Logo <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="channel_logo"
                                rows="6"
                                v-model="formData.channel_logo"
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
        channel_link: '',
        channel_logo: '',
        channel_name: ''
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
