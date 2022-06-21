<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="12" sm="12">
                <b-overlay :show="loading">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                            <div class="row">
                                <div class="col-md-6">
                                    <ValidationProvider name="Password" vid="password" rules="">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        New Password (Confirm) <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                        type="password"
                                            id="password"
                                            v-model="formData.password"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="Name" vid="name" rules="required">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        User Name <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="name"
                                            v-model="formData.name"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="Email" vid="email" rules="required">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        User Email <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="email"
                                            v-model="formData.email"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="Point" vid="point" rules="required">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        User Point <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="point"
                                            v-model="formData.point"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="User Join" vid="total_refer" rules="required">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        User join <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="total_refer"
                                            v-model="formData.total_refer"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="Status" vid="status" rules="required">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        User status <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="status"
                                            v-model="formData.status"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="Register Date" vid="created_at" rules="required">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        User Register Date <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="created_at"
                                            v-model="formData.created_at"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="Refed ID" vid="refer_id" rules="">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        User Refed ID Used  <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="refer_id"
                                            v-model="formData.refer_id"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="User Own Refer ID" vid="own_refer_id" rules="required">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        User Own Refer ID  <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="own_refer_id"
                                            v-model="formData.own_refer_id"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="Daily Limit" vid="limit" rules="required">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        Daily Limit  <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="limit"
                                            v-model="formData.limit"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6">
                                    <ValidationProvider name="Channel Link" vid="channel_link" rules="required">
                                        <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        slot-scope="{ valid, errors }"
                                        >
                                        <template v-slot:label>
                                        Channel Link  <span class="text-danger">*</span>
                                        </template>
                                        <b-form-input
                                            id="channel_link"
                                            v-model="formData.channel_link"
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            ></b-form-input>
                                        <div class="invalid-feedback">
                                            {{ errors[0] }}
                                        </div>
                                        </b-form-group>
                                    </ValidationProvider>
                                </div>
                                <div class="col-md-6 text-right">
                                    <b-button type="submit" variant="primary" style="margin-top:40px" class="mr-2">{{ saveBtnName }}</b-button>
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
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: ['id'],
  created () {
    this.getItem()
  },
  data () {
    return {
      saveBtnName: 'Update',
      formData: {
        content: ''
      },
      loading: false
    }
  },
  methods: {
    getItem () {
        this.$store.dispatch('mutedLoad', { loading: true })
         RestApi.getData(baseUrl, `api/user-signup/show/${this.id}`).then(response => {
                if (response.success) {
                    this.formData = response.data
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
    },
    async register () {
        this.loading = true
        let result = null
        if (this.id) {
            result = await RestApi.putData(baseUrl, `${'api/user-signup/update'}/${this.id}`, this.formData)
        }
        this.loading = false
        if (result.success) {
            iziToast.success({
                title: 'Success',
                message: result.message
            })
        } else {
            this.$refs.form.setErrors(result.errors)
        }
    },
  }
}
</script>
