<template>
<div>
    <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                    <strong>Approve List</strong>
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <b-row>
                <b-col md='12' lg='12' xl='12'>
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(searchData)" @reset.prevent="reset" >
                            <div class="row">
                                <div class="col-md-4">
                                    <b-form-group
                                    label-cols-md="12"
                                    >
                                    <template v-slot:label>
                                    Email
                                    </template>
                                    <b-form-input
                                        id="email"
                                        v-model="search.email"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-4">
                                    <b-form-group
                                    label-cols-md="12"
                                    >
                                    <template v-slot:label>
                                    Paymet Method
                                    </template>
                                    <b-form-input
                                        id="method_name"
                                        v-model="search.method_name"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-4">
                                    <b-form-group
                                    label-cols-md="12"
                                    >
                                    <template v-slot:label>
                                    Account No
                                    </template>
                                    <b-form-input
                                        id="account_info"
                                        v-model="search.account_info"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <div style="height:40px">
                                        <b-button style='position:absolute;bottom:15px' type="submit" variant="primary">Search</b-button>
                                    </div>
                                </div>
                            </div>
                        </b-form>
                    </ValidationObserver>
                </b-col>
            </b-row>
            <b-overlay :show='loading'>
                <div class="overflow-auto">
                    <b-table thead-class="bg-light text-dark" emptyText="Data Not Found" small show-empty bordered hover :items="itemList" :fields="fields">
                        <template v-slot:cell(index)="data">
                            {{ $n(data.index + pagination.slOffset) }}
                        </template>
                       <template v-slot:cell(created_at)="data">
                            {{ data.item.created_at | dateFormat }}
                        </template>
                        <template v-slot:cell(email)="data">
                            <router-link :to='`/users/profile?id=` + data.item.user_id' >
                                {{ data.item.email }}
                            </router-link>
                        </template>
                        <template v-slot:cell(status)="data">
                            <span class="badge badge-warning" v-if="data.item.status == 1">Pending</span>
                            <span class="badge badge-success" v-if="data.item.status == 2">Approve</span>
                            <span class="badge badge-danger" v-if="data.item.status == 3">Reject</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button v-if="data.item.status !== 1" title="Cancel" class="ml-2 btn btn-warning btn-sm" @click="changeStatus(data.item, 1)"> <i class="ri-close-circle-line"></i> </b-button>
                            <b-button v-if="data.item.status !== 2" title="Approve" class="btn btn-success ml-2 btn-sm" @click="changeStatus(data.item, 2)"> <i class="ri-check-line"></i></b-button>
                            <b-button v-if="data.item.status !== 3" title="Reject" class="ml-2 btn btn-danger btn-sm" @click="changeStatus(data.item, 3)"><i class="ri-close-line"></i></b-button>
                        </template>
                    </b-table>
                </div>
            </b-overlay>
            <b-pagination
            class="text-right"
            v-model="pagination.currentPage"
            :total-rows="pagination.total"
            :per-page="pagination.perPage"
            @input="searchData"
            ></b-pagination>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</div>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import { ValidationObserver } from 'vee-validate'
import iziToast from 'izitoast';

export default {
    components: {
        ValidationObserver
    },
    created () {
        this.loadData ()
    },
    data() {
      return {
        search: {
            method_name: '',
            email: '',
            account_info: ''
        },
        pagination: {
            perPage: 10,
            currentPage: 1,
            total: 0
        },
        editId: ''
      }
    },
    computed: {
        itemList () {
            return this.$store.state.list
        },
        fields () {
            const labels = [
                { label: 'Sl No', class: 'text-left' },
                { label: 'User Id', class: 'text-center' },
                { label: 'Amount', class: 'text-center' },
                { label: 'Paying Account', class: 'text-center' },
                { label: 'Payment Method', class: 'text-center' },
                { label: 'Status', class: 'text-center' },
                { label: 'date', class: 'text-center' },
                { label: 'Action', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'id' },
            { key: 'email' },
            { key: 'amount' },
            { key: 'account_info' },
            { key: 'method_name' },
            { key: 'status' },
            { key: 'created_at' },
            { key: 'action' }
            ]
            return labels.map((item, index) => {
                return Object.assign(item, keys[index])
            })
        },
        loading () {
          return this.$store.state.static.loading
        },
        listReload () {
          return this.$store.state.static.listReload
        }
    },
    watch: {
      listReload: function (newVal) {
        if (newVal) {
            this.loadData()
        }
      }
    },
    methods: {
        edit (item) {
            this.editId = item.id
        },
        changeStatus (item, status) {
            this.$swal({
                title: 'Are you sure to change status ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                this.toggleStatus(item, status)
                }
            })
        },
        toggleStatus (item, statusId) {
            RestApi.putData(baseUrl, `api/withdraw/status/${item.id}`, { status: statusId }).then(response => {
                if (response.success) {
                    this.$store.dispatch('mutedLoad', { listReload: true })
                    iziToast.success({
                        title: 'Success',
                        message: response.message
                    })
                } else {
                    iziToast.error({
                        title: 'Success',
                        message: response.message
                    })
                }
            })
        },
        searchData () {
            this.loadData()
        },
        loadData () {
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage, status: 2 })
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.getData(baseUrl, 'api/withdraw/list', params).then(response => {
                if (response.success) {
                    this.$store.dispatch('setList', response.data.data)
                    this.paginationData(response.data)
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        },
        paginationData (data) {
            this.pagination.perPage = parseInt(data.per_page)
            this.pagination.currentPage = parseInt(data.current_page)
            this.pagination.total = parseInt(data.total)
        }
    },
    filters: {
        subStr: function(string) {
            return string.substring(0, 80) + '...';
        }
    }
}
</script>