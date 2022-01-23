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
                                                        </div>
                                                        <div class="col-md-12 text-right">
                                                            <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">{{ saveBtnName }}</b-button>
                                                        </div>
                                                    </div>
                                                </b-form>
                                            </ValidationObserver>
                                        </b-overlay>
                                    </b-col>
                                    <b-col lg="12" sm="12">
                                        <b-overlay :show="false">
                                            <ValidationObserver ref="form1"  v-slot="{ handleSubmit, reset }">
                                                <b-form  @submit.prevent="handleSubmit(message)" @reset.prevent="reset" >
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Admin Notice" vid="admin_notice" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Admin Notice <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="admin_notice"
                                                                    v-model="messages.admin_notice"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Pakage Message" vid="pakage_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Pakage Message <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="pakage_message"
                                                                    v-model="messages.pakage_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Recharge Message" vid="recharge_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Recharge Message <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="recharge_message"
                                                                    v-model="messages.recharge_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Cash Out Message" vid="cash_out_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Cash Out Message <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="cash_out_message"
                                                                    v-model="messages.cash_out_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Add Money Message" vid="add_money_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Add Money Message <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="add_money_message"
                                                                    v-model="messages.add_money_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Payment Number Message" vid="payment_number_message" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Payment Number Message <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="payment_number_message"
                                                                    v-model="messages.payment_number_message"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Add Notice" vid="add_notice" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="messages"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Add Notice <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-textarea
                                                                    type="text"
                                                                    id="add_notice"
                                                                    v-model="messages.add_notice"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-textarea>
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
                                    <b-col lg="12" sm="12">
                                        <b-overlay :show="false">
                                            <ValidationObserver ref="form2"  v-slot="{ handleSubmit, reset }">
                                                <b-form  @submit.prevent="handleSubmit(image)" @reset.prevent="reset" >
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image One" vid="image_one" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image One <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_one"
                                                                    @change="handleimgone"
                                                                    v-model="images.image_one"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image Two" vid="image_two" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image Two <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_two"
                                                                    @change="handleimgtwo"
                                                                    v-model="images.image_two"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image Three" vid="image_three" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image Three <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_three"
                                                                    @change="handleimgthree"
                                                                    v-model="images.image_three"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image Four" vid="image_four" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image Four <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_four"
                                                                    @change="handleimgfour"
                                                                    v-model="images.image_four"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Image Five" vid="image_five" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Image Five <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="image_five"
                                                                    @change="handleimgfive"
                                                                    v-model="images.image_five"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
                                                                <div class="invalid-feedback">
                                                                    {{ errors[0] }}
                                                                </div>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <ValidationProvider name="Refer Image" vid="refer_image" rules="">
                                                                <b-form-group
                                                                class="row"
                                                                label-cols-sm="12"
                                                                label-for="images"
                                                                slot-scope="{ valid, errors }"
                                                                >
                                                                <template v-slot:label>
                                                                Refer Image <span class="text-danger">*</span>
                                                                </template>
                                                                <b-form-file
                                                                    type="text"
                                                                    id="refer_image"
                                                                    @change="handleimgrefer"
                                                                    v-model="images.refer_image"
                                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                                    ></b-form-file>
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
        refer_bonus: ''
      },
      messages: {
        add_money_message: ''
      },
      images: {
          image_one: [],
          image_two: [],
          image_three: [],
          image_four: [],
          image_five: [],
          refer_image: []
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
        formData.append('refer_image', this.formData.refer_image)
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
    handleimgrefer( event ){
        this.formData.refer_image = event.target.files[0];
    }
  }
}
</script>
