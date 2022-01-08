<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="10" offset-lg="1" sm="12">
                <b-overlay :show="loading">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                        <ValidationProvider name="Email" vid="email" rules="required">
                            <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label-for="formData"
                            slot-scope="{ valid, errors }"
                            >
                            <template v-slot:label>
                            Email <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                id="email"
                                rows="6"
                                v-model="formData.email"
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
  props: ['email'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  created () {
  },
  data () {
    return {
      saveBtnName: 'Save',
      formData: {
        email: ''
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
    async register () {
        this.$store.dispatch('mutedLoad', { loading: true, listReload: false })
        let result = null
        result = await RestApi.postData(baseUrl,'api/exclusive/store', this.formData)
        this.$store.dispatch('mutedLoad', { loading: false, listReload: true })
        if (result.success) {
            iziToast.success({
                title: 'Success',
                message: result.message
            })
            this.$bvModal.hide('modal-1')
        } else {
            iziToast.error({
                title: 'Error',
                message: result.message
            })
        }
    }
  }
}
</script>
