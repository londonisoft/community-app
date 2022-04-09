<template>
  <div>
    <CRow>
      <CCol sm="12" md="12">
        <CCard accent-color="success">
            <CCardBody>
                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body d-flex align-items-center p-0">
                                <div class="mr-3 text-white bg-gradient-primary p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="36">
                                    <path fill="var(--ci-primary-color, currentColor)" d="M208,16A112.127,112.127,0,0,0,96,128v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L60.4,343.656A79.725,79.725,0,0,0,24,410.732V496H312V464H56V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,128,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L240.5,307.007,312,353.483V315.317l-29.223-19,27.455-50.334A80.23,80.23,0,0,0,320,207.681V128A112.127,112.127,0,0,0,208,16Z" class="ci-primary"></path>
                                    <polygon fill="var(--ci-primary-color, currentColor)" points="424 400 424 336 392 336 392 400 328 400 328 432 392 432 392 496 424 496 424 432 488 432 488 400 424 400" class="ci-primary"></polygon>
                                    </svg>
                                </div>
                                <div>
                                <div class="text-muted text-uppercase font-weight-bold"> Total Customer </div>
                                <div class="text-value text-gradient-primary">{{ parseFloat(formData.total_customer).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body d-flex align-items-center p-0">
                                <div class="mr-3 text-white bg-gradient-info p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="36">
                                    <path fill="var(--ci-primary-color, currentColor)" d="M208,16A112.127,112.127,0,0,0,96,128v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L60.4,343.656A79.725,79.725,0,0,0,24,410.732V496H312V464H56V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,128,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L240.5,307.007,312,353.483V315.317l-29.223-19,27.455-50.334A80.23,80.23,0,0,0,320,207.681V128A112.127,112.127,0,0,0,208,16Z" class="ci-primary"></path>
                                    <polygon fill="var(--ci-primary-color, currentColor)" points="424 400 424 336 392 336 392 400 328 400 328 432 392 432 392 496 424 496 424 432 488 432 488 400 424 400" class="ci-primary"></polygon>
                                    </svg>
                                </div>
                                <div>
                                <div class="text-muted text-uppercase font-weight-bold"> Total Loan </div>
                                <div class="text-value text-gradient-primary">{{ parseFloat(formData.total_loan).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body d-flex align-items-center p-0">
                                <div class="mr-3 text-white bg-gradient-warning p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="36">
                                    <path fill="var(--ci-primary-color, currentColor)" d="M208,16A112.127,112.127,0,0,0,96,128v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L60.4,343.656A79.725,79.725,0,0,0,24,410.732V496H312V464H56V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,128,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L240.5,307.007,312,353.483V315.317l-29.223-19,27.455-50.334A80.23,80.23,0,0,0,320,207.681V128A112.127,112.127,0,0,0,208,16Z" class="ci-primary"></path>
                                    <polygon fill="var(--ci-primary-color, currentColor)" points="424 400 424 336 392 336 392 400 328 400 328 432 392 432 392 496 424 496 424 432 488 432 488 400 424 400" class="ci-primary"></polygon>
                                    </svg>
                                </div>
                                <div>
                                <div class="text-muted text-uppercase font-weight-bold"> Total Paid </div>
                                <div class="text-value text-gradient-primary">{{ parseFloat(formData.total_paid).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body d-flex align-items-center p-0">
                                <div class="mr-3 text-white bg-gradient-danger p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="36">
                                    <path fill="var(--ci-primary-color, currentColor)" d="M208,16A112.127,112.127,0,0,0,96,128v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L60.4,343.656A79.725,79.725,0,0,0,24,410.732V496H312V464H56V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,128,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L240.5,307.007,312,353.483V315.317l-29.223-19,27.455-50.334A80.23,80.23,0,0,0,320,207.681V128A112.127,112.127,0,0,0,208,16Z" class="ci-primary"></path>
                                    <polygon fill="var(--ci-primary-color, currentColor)" points="424 400 424 336 392 336 392 400 328 400 328 432 392 432 392 496 424 496 424 432 488 432 488 400 424 400" class="ci-primary"></polygon>
                                    </svg>
                                </div>
                                <div>
                                <div class="text-muted text-uppercase font-weight-bold"> Total Due </div>
                                <div class="text-value text-gradient-primary">
                                    {{ parseFloat(formData.total_due).toFixed(2) }}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body d-flex align-items-center p-0">
                                <div class="mr-3 text-white bg-gradient-danger p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="36">
                                    <path fill="var(--ci-primary-color, currentColor)" d="M208,16A112.127,112.127,0,0,0,96,128v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L60.4,343.656A79.725,79.725,0,0,0,24,410.732V496H312V464H56V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,128,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L240.5,307.007,312,353.483V315.317l-29.223-19,27.455-50.334A80.23,80.23,0,0,0,320,207.681V128A112.127,112.127,0,0,0,208,16Z" class="ci-primary"></path>
                                    <polygon fill="var(--ci-primary-color, currentColor)" points="424 400 424 336 392 336 392 400 328 400 328 432 392 432 392 496 424 496 424 432 488 432 488 400 424 400" class="ci-primary"></polygon>
                                    </svg>
                                </div>
                                <div>
                                <div class="text-muted text-uppercase font-weight-bold"> Today Loan </div>
                                <div class="text-value text-gradient-primary">
                                    {{ parseFloat(formData.today_loan).toFixed(2) }}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body d-flex align-items-center p-0">
                                <div class="mr-3 text-white bg-gradient-danger p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon c-icon-custom-size" height="36">
                                    <path fill="var(--ci-primary-color, currentColor)" d="M208,16A112.127,112.127,0,0,0,96,128v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L60.4,343.656A79.725,79.725,0,0,0,24,410.732V496H312V464H56V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,128,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L240.5,307.007,312,353.483V315.317l-29.223-19,27.455-50.334A80.23,80.23,0,0,0,320,207.681V128A112.127,112.127,0,0,0,208,16Z" class="ci-primary"></path>
                                    <polygon fill="var(--ci-primary-color, currentColor)" points="424 400 424 336 392 336 392 400 328 400 328 432 392 432 392 496 424 496 424 432 488 432 488 400 424 400" class="ci-primary"></polygon>
                                    </svg>
                                </div>
                                <div>
                                <div class="text-muted text-uppercase font-weight-bold"> Today Paid </div>
                                <div class="text-value text-gradient-primary">
                                    {{ parseFloat(formData.today_paid).toFixed(2) }}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import RestApi, { baseUrl } from '../config/api_config'
export default {
  name: 'Dashboard',
  components: {
  },
  data () {
    return {
      selected: 'Month',
      formData: {}
    }
  },
  created() {
      this.loadData()
  },
  methods: {
        loadData () {
            const params = {}
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.getData(baseUrl, 'api/dashboard/data', params).then(response => {
                if (response.success) {
                    this.formData = response.data
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        },
  }
}
</script>
