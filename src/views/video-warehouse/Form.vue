<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="10" offset-lg="1" sm="12">
                <b-overlay :show="loading">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                        <ValidationProvider name="Video URL" vid="channel_name" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="channel_name"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Video URL <span class="text-danger">*</span>
                            </template>
                                <b-form-select
                                  id="channel_name"
                                  v-model="formData.channel_name"
                                  :state="errors[0] ? false : (valid ? true : null)"
                                  :options="options">
                                </b-form-select>
                            <div class="invalid-feedback">
                                {{ errors[0] }}
                            </div>
                            </b-form-group>
                        </ValidationProvider>
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
        channel_name: 'Channel 1',
        video_url: ''
      },
        options: [
          { value: 'Channel 1', text: 'Channel 1'},
          { value: 'Channel 2', text: 'Channel 2'},
          { value: 'Channel 3', text: 'Channel 3'},
          { value: 'Channel 4', text: 'Channel 4'},
          { value: 'Channel 5', text: 'Channel 5'},
          { value: 'Channel 6', text: 'Channel 6'},
          { value: 'Channel 7', text: 'Channel 7'},
          { value: 'Channel 8', text: 'Channel 8'},
          { value: 'Channel 9', text: 'Channel 9'},
          { value: 'Channel 10', text: 'Channel 10'},
          { value: 'Channel 11', text: 'Channel 11'},
          { value: 'Channel 12', text: 'Channel 12'},
          { value: 'Channel 13', text: 'Channel 13'},
          { value: 'Channel 14', text: 'Channel 14'},
          { value: 'Channel 15', text: 'Channel 15'},
          { value: 'Channel 16', text: 'Channel 16'},
          { value: 'Channel 17', text: 'Channel 17'},
          { value: 'Channel 18', text: 'Channel 18'},
          { value: 'Channel 19', text: 'Channel 19'},
          { value: 'Channel 20', text: 'Channel 20'},
          { value: 'Channel 21', text: 'Channel 21'},
          { value: 'Channel 22', text: 'Channel 22'},
          { value: 'Channel 23', text: 'Channel 23'},
          { value: 'Channel 24', text: 'Channel 24'},
          { value: 'Channel 25', text: 'Channel 25'},
          { value: 'Channel 26', text: 'Channel 26'},
          { value: 'Channel 27', text: 'Channel 27'},
          { value: 'Channel 28', text: 'Channel 28'},
          { value: 'Channel 29', text: 'Channel 29'},
          { value: 'Channel 30', text: 'Channel 30'},
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
            result = await RestApi.putData(baseUrl, `${'api/video-warehouse/update'}/${this.id}`, this.formData)
        } else {
            result = await RestApi.postData(baseUrl,'api/video-warehouse/store', this.formData)
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
