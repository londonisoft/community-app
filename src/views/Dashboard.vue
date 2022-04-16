<template>
  <div>
    <CRow>
      <CCol sm="12" md="12">
        <CCard accent-color="success">
            <CCardBody>
                <div class="row">
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card bg-primary">
                            <div class="card-body d-flex align-items-center p-4">
                                <div>
                                    <div class="text-light text-uppercase font-weight-bold"> Total Customer </div>
                                    <div class="text-light text-gradient-primary">{{ parseFloat(formData.total_customer).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card bg-gradient-primary">
                            <div class="card-body d-flex align-items-center p-4">
                                <div>
                                    <div class="text-light text-uppercase font-weight-bold"> Active Customer </div>
                                    <div class="text-light text-gradient-primary">{{ parseFloat(formData.total_active_customer).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card bg-success">
                            <div class="card-body d-flex align-items-center p-4">
                                <div>
                                    <div class="text-light text-uppercase font-weight-bold"> Inactive Customer </div>
                                    <div class="text-light text-gradient-primary">{{ parseFloat(formData.total_inactive_customer).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card bg-gradient-info">
                            <div class="card-body d-flex align-items-center p-4">
                                <div>
                                <div class="text-light text-uppercase font-weight-bold"> Total Payable </div>
                                <div class="text-light text-gradient-primary">{{ parseFloat(formData.total_payable).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card bg-gradient-warning">
                            <div class="card-body d-flex align-items-center p-4">
                                <div>
                                <div class="text-light text-uppercase font-weight-bold"> Total Paid </div>
                                <div class="text-light text-gradient-primary">{{ parseFloat(formData.total_paid).toFixed(2) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card bg-gradient-danger">
                            <div class="card-body d-flex align-items-center p-4">
                                <div>
                                    <div class="text-light text-uppercase font-weight-bold"> Total Due </div>
                                    <div class="text-light text-gradient-primary">
                                        {{ parseFloat(formData.total_due).toFixed(2) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="card bg-secondary">
                            <div class="card-body d-flex align-items-center p-4">
                                <div>
                                    <div class="text-light text-uppercase font-weight-bold"> Today Paid </div>
                                    <div class="text-light text-gradient-primary">
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
            this.$store.dispatch('lightLoad', { loading: true})
            RestApi.getData(baseUrl, 'api/dashboard/data', params).then(response => {
                if (response.success) {
                    this.formData = response.data
                }
                this.$store.dispatch('lightLoad', { loading: false })
            })
        },
  }
}
</script>
