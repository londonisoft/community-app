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
                                    Mobile
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
                                    label-cols-md="12"
                                    label-for="formData"
                                    >
                                    <template v-slot:label>
                                    Work Date
                                    </template>
                                    <b-form-input
                                        id="date"
                                        type='date'
                                        v-model="search.work_date"
                                        ></b-form-input>
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
            <p class="text-right">Total : <span class="badge badge-success">{{ itemList.length }}</span></p>
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
                        <template v-slot:cell(date)>
                            {{ search.work_date }}
                        </template>
                        <template v-slot:cell(video_added_status)="data">
                            <span class="badge badge-success" v-if="parseInt(data.item.video_added_status) == 1">Added</span>
                            <span class="badge badge-danger" v-else>Not Added</span>
                        </template>
                        <!-- <template v-slot:cell(status)="data">
                            <span class="badge badge-success" v-if="data.item.status == 1">Active</span>
                            <span class="badge badge-danger" v-else>Block</span>
                        </template> -->
                        <template v-slot:cell(action)="data">
                            <!-- <b-button v-if="data.item.status == 2" title="Active" class="btn btn-success ml-2 btn-sm" @click="changeStatus(data.item)"> <i class="ri-check-line"></i></b-button>
                            <b-button v-else title="Block" class="ml-2 btn btn-danger btn-sm" @click="changeStatus(data.item)"><i class="ri-close-line"></i></b-button>
                            <b-button v-b-modal.modal-1 title="Block" class="ml-2 btn btn-warning btn-sm" @click="edit(data.item)"> <i class="ri-notification-line"></i></b-button> -->
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
            work_date: 0
        },
        pagination: {
            perPage: 10,
            currentPage: 1,
            total: 0,
            slOffset: 1
        },
        editId: ''
      }
    },
    computed: {
        itemList () {
            return this.$store.state.list.sort((a, b) => { return b.view_count - a.view_count })
        },
       fields () {
            const labels = [
                { label: 'Sl No', class: 'text-left' },
                { label: 'Username', class: 'text-center' },
                { label: 'Name', class: 'text-center' },
                { label: 'Mobile', class: 'text-center' },
                { label: 'Views', class: 'text-center' },
                { label: 'Video Added Status', class: 'text-center' },
                { label: 'Action', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'id' },
            { key: 'username' },
            { key: 'name' },
            { key: 'email' },
            { key: 'point' },
            { key: 'video_added_status' },
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