<template>
<div>
    <CRow>
    <CCol col>
      <CCard>
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                    <CIcon name="cil-justify-center"/><strong> Video List</strong>
                </div>
                <div class="col-md-6">
                    <div class="text-right">
                          <button class="btn btn-primary" @click="editId = ''" v-b-modal.modal-1>Add New</button>
                    </div>
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
                                    >
                                    <template v-slot:label>
                                    Video Url
                                    </template>
                                    <b-form-input
                                        id="video_url"
                                        v-model="search.video_url"
                                        ></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-12 text-right">
                                    <div style="height:40px">
                                        <b-button type="submit" variant="primary">Search</b-button>
                                    </div>
                                </div>
                            </div>
                        </b-form>
                    </ValidationObserver>
                </b-col>
            </b-row>
            <div class="row">
                <b-col md="2" xl="2" sm="2">
                    <b-form-checkbox v-model="checkAll">Check All</b-form-checkbox>
                </b-col>
                <b-col md="4" xl="4" sm="4">
                    <b-button style='' class="btn-sm" type="button" @click="deleteAll()" variant="danger">Delete</b-button>
                    <b-button style='margin:2px' class="btn-sm" type="button" @click="activeAll()" variant="success">Active</b-button>
                </b-col>
            </div>
            <b-overlay :show='loading'>
                <div class="overflow-auto">
                    <b-table thead-class="bg-light text-dark" emptyText="Data Not Found" show-empty bordered hover :items="itemList" :fields="fields">
                        <template v-slot:cell(index)="data">
                            <b-form-checkbox v-model="data.item.select">{{ $n(data.index + pagination.slOffset) }}</b-form-checkbox>
                        </template>
                        <template v-slot:cell(current_date)="data">
                            <span class="badge badge-success">{{ data.item.current_date }}</span>
                        </template>
                        <template v-slot:cell(link)="data">
                            <a :href="data.item.video_url" target="_blank">Link</a>
                        </template>
                        <template v-slot:cell(status)="data">
                            <span class="badge badge-success" v-if="data.item.status == 1">Active</span>
                            <span class="badge badge-danger" v-else>Inactive</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button v-if="data.item.status == 2" title="Active" class="btn btn-success mr-2 btn-sm" @click="changeStatus(data.item)"> <i class="ri-check-line"></i></b-button>
                            <b-button v-else title="Block" class="mr-2 btn btn-danger btn-sm" @click="changeStatus(data.item)"><i class="ri-close-line"></i></b-button>
                            <b-button class="btn btn-success btn-sm" v-b-modal.modal-1 @click="edit(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
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
  <b-modal id="modal-1"
      size="lg"
    header-bg-variant="primary"
    header-text-variant="light"
      title="Video Entry" hide-footer>
    <div>
        <Form :id='editId'/>
  </div>
  </b-modal>
</div>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import Form from './Form'
import iziToast from 'izitoast';

export default {
    components: {
        Form
    },
    created () {
        this.loadData ()
    },
    data() {
      return {
        checkAll: false,
        search: {
            name: '',
            email: '',
            video_url: ''
        },
        pagination: {
            perPage: 10,
            currentPage: 1,
            total: 0,
            slOffset: 1
        },
        editId: '',
        options: [
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
                { label: 'Mobile', class: 'text-center' },
                { label: 'URL', class: 'text-center' },
                { label: 'Views', class: 'text-center' },
                { label: 'Link', class: 'text-center' },
                { label: 'Status', class: 'text-center' },
                { label: 'Action', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'index' },
            { key: 'name' },
            { key: 'email' },
            { key: 'video_url' },
            { key: 'views' },
            { key: 'link' },
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
      },
        checkAll: function (newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal) {
                    this.itemList.forEach(item => {
                        item.select = true
                    })
                } else {
                    this.itemList.forEach(item => {
                        item.select = false
                    })
                }
            }
        }
    },
    methods: {
        edit (item) {
            this.editId = item.id
        },
        searchData () {
            this.loadData()
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
        toggleStatus (item) {
            RestApi.deleteData(baseUrl, `api/package/package-status/${item.id}`).then(response => {
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
        loadData () {
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.getData(baseUrl, 'api/package/list', params).then(response => {
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
            this.pagination.slOffset = this.pagination.perPage * this.pagination.currentPage - this.pagination.perPage + 1
        },
        deleteAll () {
            this.$swal({
                title: 'Are you sure to delete message ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                this.deleteallData()
                }
            })
        },
        deleteallData () {
            if (this.itemList.length <= 0) {
                iziToast.error({
                    title: 'Error',
                    message: "Please enter message and check customer."
                })
                return false
            }
            const itemList = this.itemList.filter(item => item.select === true).map(item => {
                return item.id
            })
            this.$store.dispatch('mutedLoad', { loading: true })
            RestApi.postData(baseUrl, `api/package/delete-all`, { data: itemList }).then(response => {
                if (response.success) {
                    this.$store.dispatch('mutedLoad', { listReload: true })
                    iziToast.success({
                        title: 'Success',
                        message: response.message
                    })
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: response.message
                    })
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        },
        activeAll () {
            this.$swal({
                title: 'Are you sure to active message ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                this.activeallData()
                }
            })
        },
        activeallData () {
            if (this.itemList.length <= 0) {
                iziToast.error({
                    title: 'Error',
                    message: "Please enter message and check customer."
                })
                return false
            }
            const itemList = this.itemList.filter(item => item.select === true).map(item => {
                return item.id
            })
            this.$store.dispatch('mutedLoad', { loading: true })
            RestApi.postData(baseUrl, `api/package/active-all`, { data: itemList }).then(response => {
                if (response.success) {
                    this.$store.dispatch('mutedLoad', { listReload: true })
                    iziToast.success({
                        title: 'Success',
                        message: response.message
                    })
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: response.message
                    })
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        },
    },
    filters: {
        subStr: function(string) {
            return string.substring(0, 80) + '...';
        }
    }
}
</script>