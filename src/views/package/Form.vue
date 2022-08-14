<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="10" offset-lg="1" sm="12">
                <b-overlay :show="loading">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                        <ValidationProvider name="Video URL" vid="video_url" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Video URL <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="video_url"
                                rows="6"
                                v-model="formData.video_url"
                                :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-input>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="Video URL" vid="del_views" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Video URL <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="del_views"
                                rows="6"
                                v-model="formData.del_views"
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
        current_date: '',
        video_url: ''
      },
      options: [
          { value: 1, text: '1 Tarikh'},
          { value: 2, text: '2 Tarikh'},
          { value: 3, text: '3 Tarikh'},
          { value: 4, text: '4 Tarikh'},
          { value: 5, text: '5 Tarikh'},
          { value: 6, text: '6 Tarikh'},
          { value: 7, text: '7 Tarikh'},
          { value: 8, text: '8 Tarikh'},
          { value: 9, text: '9 Tarikh'},
          { value: 10, text: '10 Tarikh'},
          { value: 11, text: '11 Tarikh'},
          { value: 12, text: '12 Tarikh'},
          { value: 13, text: '13 Tarikh'},
          { value: 14, text: '14 Tarikh'},
          { value: 15, text: '15 Tarikh'},
          { value: 16, text: '16 Tarikh'},
          { value: 17, text: '17 Tarikh'},
          { value: 18, text: '18 Tarikh'},
          { value: 19, text: '19 Tarikh'},
          { value: 20, text: '20 Tarikh'},
          { value: 21, text: '21 Tarikh'},
          { value: 22, text: '22 Tarikh'},
          { value: 23, text: '23 Tarikh'},
          { value: 24, text: '24 Tarikh'},
          { value: 25, text: '25 Tarikh'},
          { value: 26, text: '26 Tarikh'},
          { value: 27, text: '27 Tarikh'},
          { value: 28, text: '28 Tarikh'},
          { value: 29, text: '29 Tarikh'},
          { value: 30, text: '30 Tarikh'},
          { value: 31, text: '31 Tarikh'}
      ]
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
