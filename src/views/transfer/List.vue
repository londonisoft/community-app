<template>
<div>
    <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                    <strong>All List</strong>
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <b-row>
                <b-col  class="ml-3">
                    <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                        <b-form  @submit.prevent="handleSubmit(searchData)" @reset.prevent="reset" >
                            <div class="row">
                                <div class="col-md-4">
                                    <b-form-group
                                    label-cols-md="12"
                                    >
                                    <template v-slot:label>
                                    Sender Email
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
                                    Receiver Email
                                    </template>
                                    <b-form-input
                                        id="re_email"
                                        v-model="search.re_email"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-4">
                                    <b-form-group
                                    label-cols-md="12"
                                    >
                                    <template v-slot:label>
                                    Country
                                    </template>
                                    <b-form-input
                                        id="country"
                                        v-model="search.country"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-4">
                                    <b-form-group
                                    label-cols-md="12"
                                    >
                                    <template v-slot:label>
                                    Form Date
                                    </template>
                                    <b-form-input
                                        id="form_date"
                                        type="date"
                                        v-model="search.form_date"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-4">
                                    <b-form-group
                                    label-cols-md="12"
                                    >
                                    <template v-slot:label>
                                    To Date
                                    </template>
                                    <b-form-input
                                        id="to_date"
                                        type="date"
                                        v-model="search.to_date"
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
                        <template v-slot:cell(user_email)="data">
                            <router-link :to='`/users/profile?id=` + data.item.user_id' >
                                {{ data.item.user_email }}
                            </router-link>
                        </template>
                        <template v-slot:cell(email)="data">
                            <router-link :to='`/users/profile?id=` + data.item.user_id' >
                                {{ data.item.email }}
                            </router-link>
                        </template>
                        <template v-slot:cell(created_at)="data">
                            {{ data.item.created_at | dateFormat }}
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
            form_date: '',
            to_date: '',
            email: '',
            country: ''
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
                { label: 'Email', class: 'text-center' },
                { label: 'Country', class: 'text-center' },
                { label: 'Amount', class: 'text-center' },
                { label: 'Transfer To', class: 'text-center' },
                { label: 'Date', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'id' },
            { key: 'user_email' },
            { key: 'country' },
            { key: 'amount' },
            { key: 'email' },
            { key: 'created_at' }
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
            RestApi.putData(baseUrl, `api/transfer/status/${item.id}`, { status: statusId }).then(response => {
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
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.getData(baseUrl, 'api/transfer/list', params).then(response => {
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