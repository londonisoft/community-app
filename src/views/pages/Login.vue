<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="5">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                  <h1 class="text-center">Login</h1>
                  <p class="text-muted text-center">Sign In to your account</p>
                    <b-alert :show="errorAlert" variant=" " dismissible fade class="text-white bg-danger">
                      <div class="iq-alert-icon">
                        <i class="ri-information-line"></i>
                      </div>
                      <div class="iq-alert-text">{{ errorMsg }}</div>
                    </b-alert>
                  <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                      <b-form @submit.prevent="handleSubmit(login)" @reset.prevent="reset" >
                        <ValidationProvider name="email" rules="required|email">
                          <b-form-group
                            class="row"
                            label-cols-sm="12"
                            label="Mobile:"
                            label-for="email"
                            slot-scope="{ valid, errors }"
                          >
                            <b-form-input
                              id="email"
                              v-model="user.email"
                              placeholder=""
                              :state="errors[0] ? false : (valid ? true : null)"
                              ></b-form-input>
                            <div class="invalid-feedback">
                              {{ errors[0] }}
                            </div>
                          </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider name="password" rules="required|min:3">
                          <b-form-group
                            class="row mt-3"
                            label-cols-sm="12"
                            label="Password:"
                            label-for="password"
                            slot-scope="{ valid, errors }"
                          >
                            <b-form-input
                              id="password"
                              type="password"
                              v-model="user.password"
                              placeholder=""
                              :state="errors[0] ? false : (valid ? true : null)"
                              ></b-form-input>
                              <div class="invalid-feedback">
                              {{ errors[0] }}
                            </div>
                          </b-form-group>
                        </ValidationProvider>
                        <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="customControlInline" />
                              <label class="custom-control-label" for="customControlInline">Remember me</label>
                          </div>
                          <div class="mt-3">
                              <button class="btn btn-primary btn-block" type="submit">Log In</button>
                          </div>
                          <div class="mt-4 text-center">
                              <a href="#"><i class="mdi mdi-lock mr-1"></i> Forgot your password?</a>
                          </div>
                      </b-form>
                    </ValidationObserver>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import RestApi, { baseUrl } from '../../config/api_config'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'Login',
  components: { ValidationObserver, ValidationProvider },
  data: () => ({
    user: {
      password: '',
      email: ''
    },
    errorAlert: false,
    errorMsg: ''
  }),
  methods: {
    async login () {
        await RestApi.postData(baseUrl, 'login', this.user).then(response => {
		
		if (response.token) {
			localStorage.setItem('access_token', response.token)
			localStorage.setItem('accessUsername', this.user.email)
			this.$store.commit('auth_success', response.token, this.user)
			this.$router.push('/dashboard')
		}
      }, err => {
        console.log('http error=', err)
        this.errorAlert = true
        this.errorMsg = 'Failed to login. Please, try again.'
      })
    }
  }
}
</script>