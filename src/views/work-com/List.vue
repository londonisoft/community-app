<template>
<div>
    <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                    <strong>Work Completed Users</strong>
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
                                    class="row"
                                    label-cols-md="12"
                                    label-for="formData"
                                    >
                                    <template v-slot:label>
                                    Name
                                    </template>
                                    <b-form-input
                                        id="name"
                                        v-model="search.name"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-4">
                                    <b-form-group
                                    class="row"
                                    label-cols-md="12"
                                    label-for="formData"
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
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        >
                                        <template v-slot:label>
                                        Select Year<span class="text-danger">*</span>
                                        </template>
                                            <b-form-select
                                            v-model="search.year"
                                            :options="years"
                                            id="year"
                                            ></b-form-select>
                                    </b-form-group>     
                                </div>
                                <div class="col-md-4">
                                     <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        >
                                        <template v-slot:label>
                                        Select Month <span class="text-danger">*</span>
                                        </template>
                                            <b-form-select
                                            v-model="search.month"
                                            :options="months"
                                            id="month"
                                            ></b-form-select>
                                    </b-form-group>     
                                </div>
                                <div class="col-md-4">
                                     <b-form-group
                                        class="row"
                                        label-cols-sm="12"
                                        label-for="formData"
                                        >
                                        <template v-slot:label>
                                        Select Date <span class="text-danger">*</span>
                                        </template>
                                            <b-form-select
                                            v-model="search.current_date"
                                            :options="dateList"
                                            id="name"
                                            ></b-form-select>
                                    </b-form-group>     
                                </div>
                                <div class="col-md-4">
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
                            {{ data.index + pagination.slOffset }}
                        </template>
                        <template v-slot:cell(name)="data">
                            <router-link :to='`/users/profile?id=` + data.item.id' >
                                {{ data.item.name }}
                            </router-link>
                        </template>
                        <template v-slot:cell(video_status)="data">
                            <span class="badge badge-success" v-if="data.item.status == 1">Added</span>
                            <span class="badge badge-danger" v-else>Not Added</span>
                        </template>
                        <template v-slot:cell(status)="data">
                            <span class="badge badge-success" v-if="data.item.status == 1">Active</span>
                            <span class="badge badge-danger" v-else>Block</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button v-if="data.item.status == 2" title="Active" class="btn btn-success ml-2 btn-sm" @click="changeStatus(data.item)"> <i class="ri-check-line"></i></b-button>
                            <b-button v-else title="Block" class="ml-2 btn btn-danger btn-sm" @click="changeStatus(data.item)"><i class="ri-close-line"></i></b-button>
                            <!-- <b-button v-b-modal.modal-1 title="Block" class="ml-2 btn btn-warning btn-sm" @click="edit(data.item)"> <i class="ri-notification-line"></i></b-button> -->
                            <b-button title="Video Status" class="ml-2 btn btn-success btn-sm" @click="changeVStatus(data.item)"><i class="ri-notification-line"></i></b-button>
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
        this.getCurrentData()
        this.loadData ()
    },
    data() {
      return {
        search: {
            name: '',
            email: '',
            year: 0,
            month: 0,
            current_date: 0
        },
        pagination: {
            perPage: 10,
            currentPage: 1,
            total: 0,
            slOffset: 1
        },
        editId: '',
            years: [
            {
                value: 2022,
                text: 2022
            },
            {
                value: 2023,
                text: 2023
            },
            {
                value: 2024,
                text: 2024
            },
            {
                value: 2025,
                text: 2025
            },
            {
                value: 2026,
                text: 2026
            },
            {
                value: 2027,
                text: 2027
            },
            {
                value: 2028,
                text: 2028
            },
            {
                value: 2029,
                text: 2029
            },
            {
                value: 2030,
                text: 2030
            },
        ],
        months: [
            {
                value: 1,
                text: 'January'
            },
            {
                value: 2,
                text: 'February'
            },
            {
                value: 3,
                text: 'March'
            },
            {
                value: 4,
                text: 'April'
            },
            {
                value: 5,
                text: 'May'
            },
            {
                value: 6,
                text: 'June'
            },
            {
                value: 7,
                text: 'July'
            },
            {
                value: 8,
                text: 'August'
            },
            {
                value: 9,
                text: 'September'
            },
            {
                value: 10,
                text: 'October'
            },
            {
                value: 11,
                text: 'November'
            },
            {
                value: 12,
                text: 'December'
            }
        ],
        dateList: [
          { value: 1, text: '1 Tarikh'},
          { value: 2, text: '2 Tarikh'},
          { value: 3, text: '3 Tarikh'},
          { value: 4, text: '4 Tarikh'},
          { value: 5, text: '5 Tarikh'},
          { value: 6, text: '6 Tarikh'},
          { value: 7, text: '7 Tarikh'},
          { value: 8, text: '8 Tarikh'},
          { value: 9, text: '9 Tarikh'},
          { value: 10, text: '10 Tarikh'},
          { value: 11, text: '11 Tarikh'},
          { value: 12, text: '12 Tarikh'},
          { value: 13, text: '13 Tarikh'},
          { value: 14, text: '14 Tarikh'},
          { value: 15, text: '15 Tarikh'},
          { value: 16, text: '16 Tarikh'},
          { value: 17, text: '17 Tarikh'},
          { value: 18, text: '18 Tarikh'},
          { value: 19, text: '19 Tarikh'},
          { value: 20, text: '20 Tarikh'},
          { value: 21, text: '21 Tarikh'},
          { value: 22, text: '22 Tarikh'},
          { value: 23, text: '23 Tarikh'},
          { value: 24, text: '24 Tarikh'},
          { value: 25, text: '25 Tarikh'},
          { value: 26, text: '26 Tarikh'},
          { value: 27, text: '27 Tarikh'},
          { value: 28, text: '28 Tarikh'},
          { value: 29, text: '29 Tarikh'},
          { value: 30, text: '30 Tarikh'},
          { value: 31, text: '31 Tarikh'}
        ]
      }
    },
    computed: {
        itemList () {
            return this.$store.state.list
        },
       fields () {
            const labels = [
                { label: 'Sl No', class: 'text-left' },
                { label: 'Name', class: 'text-center' },
                { label: 'Email', class: 'text-center' },
                { label: 'Point', class: 'text-center' },
                { label: 'Join', class: 'text-center' },
                { label: 'Video Status', class: 'text-center' },
                { label: 'Status', class: 'text-center' },
                { label: 'Action', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'id' },
            { key: 'name' },
            { key: 'email' },
            { key: 'point' },
            { key: 'total_refer' },
            { key: 'video_status' },
            { key: 'status' },
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
        getCurrentData () {
            const d = new Date();
            this.search.month = d.getMonth() + 1;
            this.search.year = d.getFullYear();
            this.search.current_date = d.getDate();
        },
        edit (item) {
            this.editId = item.id
        },
        changeStatus (item) {
            this.$swal({
                title: 'Are you sure to change status ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                this.toggleStatus(item)
                }
            })
        },
        changeVStatus (item) {
            this.$swal({
                title: 'Are you sure to change video status ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                this.toggleVideoStatus(item)
                }
            })
        },
        toggleStatus (item) {
            RestApi.deleteData(baseUrl, `api/user-signup/user-status/${item.id}`).then(response => {
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
        toggleVideoStatus (item) {
            RestApi.deleteData(baseUrl, `api/user-signup/user-vstatus/${item.id}`).then(response => {
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
            RestApi.getData(baseUrl, 'api/user-signup/list-completed', params).then(response => {
                if (response.success) {
                    this.$store.dispatch('setList', response.data)
                    // this.paginationData(response.data)
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        },
       paginationData (data) {
            this.pagination.perPage = parseInt(data.per_page)
            this.pagination.currentPage = parseInt(data.current_page)
            this.pagination.total = parseInt(data.total),
            this.pagination.slOffset = this.pagination.perPage * this.pagination.currentPage - this.pagination.perPage + 1
        }
    },
    filters: {
        subStr: function(string) {
            return string.substring(0, 80) + '...';
        }
    }
}
</script>