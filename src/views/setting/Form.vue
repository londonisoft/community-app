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
                                                        <!-- <div class="col-md-6">
                                                            <ValidationProvider name="Refer Bonus (Tk)" vid="refer_bonus" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Refer Bonus (Point) <span class="text-danger">*</span>
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
                                                            <ValidationProvider name="Add Code" vid="add_code" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
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
                                                        </div> -->
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Visit Point" vid="visit_point" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Visit Point <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="visit_point"
                                                                    v-model="formData.visit_point"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Start Second" vid="start_duration" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Start Second <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="start_duration"
                                                                    v-model="formData.start_duration"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-input>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="End Second" vid="end_duration" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="formData"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                End Second <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-input
                                                                    type="text"
                                                                    id="end_duration"
                                                                    v-model="formData.end_duration"
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
      saveBtnName: "Update",
      formData: {
        visit_point: '',
        start_duration: '',
        end_duration: ''
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
        this.$store.dispatch('mutedLoad', { loading: true})
        RestApi.getData(baseUrl, 'api/message/show').then(response => {
            if (response.success) {
                this.messages = response.data
            }
            this.$store.dispatch('mutedLoad', { loading: false })
        })
        this.$store.dispatch('mutedLoad', { loading: true})
        RestApi.getData(baseUrl, 'api/image/show').then(response => {
            if (response.success) {
                    this.images.image_one_url = response.data.image_one_url
                    this.images.image_two_url = response.data.image_two_url
                    this.images.image_three_url = response.data.image_three_url
                    this.images.image_four_url = response.data.image_four_url
                    this.images.image_five_url = response.data.image_five_url
                    this.images.image_six_url = response.data.image_six_url
                    this.images.image_seven_url = response.data.image_seven_url
                    this.images.image_eight_url = response.data.image_eight_url
                    this.images.image_nine_url = response.data.image_nine_url
                    this.images.image_ten_url = response.data.image_ten_url
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
    },
    async message () {
        this.$store.dispatch('mutedLoad', { loading: true })
        let result = null
        result = await RestApi.postData(baseUrl, `api/message/update`, this.messages)
        this.$store.dispatch('mutedLoad', { loading: false })
        if (result.success) {
			iziToast.success({
				title: 'Success',
				message: result.message
			})
        } else {
            this.$refs.form1.setErrors(result.errors)
        }
    },
    async image () {
        this.$store.dispatch('mutedLoad', { loading: true })
        let result = null
        let formData = new FormData()
        formData.append('image_one', this.formData.image_one)
        formData.append('image_two', this.formData.image_two)
        formData.append('image_three', this.formData.image_three)
        formData.append('image_four', this.formData.image_four)
        formData.append('image_five', this.formData.image_five)
        formData.append('image_six', this.formData.image_six)
        formData.append('image_seven', this.formData.image_seven)
        formData.append('image_eight', this.formData.image_eight)
        formData.append('image_nine', this.formData.image_nine)
        formData.append('image_ten', this.formData.image_ten)
        formData.append('refer_image', this.formData.refer_image)
        formData.append('image_one_url', this.images.image_one_url)
        formData.append('image_two_url', this.images.image_two_url)
        formData.append('image_three_url', this.images.image_three_url)
        formData.append('image_four_url', this.images.image_four_url)
        formData.append('image_five_url', this.images.image_five_url)
        formData.append('image_six_url', this.images.image_six_url)
        formData.append('image_seven_url', this.images.image_seven_url)
        formData.append('image_eight_url', this.images.image_eight_url)
        formData.append('image_nine_url', this.images.image_nine_url)
        formData.append('image_ten_url', this.images.image_ten_url)
        result = await RestApi.postData(baseUrl, `api/image/update`, formData)
        this.$store.dispatch('mutedLoad', { loading: false })
        if (result.success) {
			iziToast.success({
				title: 'Success',
				message: result.message
			})
        } else {
            this.$refs.form1.setErrors(result.errors)
        }
    },
    handleimgone( event ){
        this.formData.image_one = event.target.files[0];
    },
    handleimgtwo( event ){
        this.formData.image_two = event.target.files[0];
    },
    handleimgthree( event ){
        this.formData.image_three = event.target.files[0];
    },
    handleimgfour( event ){
        this.formData.image_four = event.target.files[0];
    },
    handleimgfive( event ){
        this.formData.image_five = event.target.files[0];
    },
    handleimgsix( event ){
        this.formData.image_six = event.target.files[0];
    },
    handleimgseven( event ){
        this.formData.image_seven = event.target.files[0];
    },
    handleimgeight( event ){
        this.formData.image_eight = event.target.files[0];
    },
    handleimgnine( event ){
        this.formData.image_nine = event.target.files[0];
    },
    handleimgten( event ){
        this.formData.image_ten = event.target.files[0];
    },
    handleimgrefer( event ){
        this.formData.refer_image = event.target.files[0];
    }
  }
}
</script>
