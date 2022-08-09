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
                                    label-cols-md="12"
                                    >
                                    <template v-slot:label>
                                    Channel Name
                                    </template>
                                      <b-form-select
                                        id="channel_name"
                                      v-model="search.channel_name"
                                      :options="options">
                                      </b-form-select>
                                    </b-form-group>
                                </div>
                                <div class="col-md-4">
                                    <b-form-group
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
            <div class="row mb-2">
                <b-col md="2" xl="2" sm="2">
                    <b-form-checkbox v-model="checkAll">Check All</b-form-checkbox>
                </b-col>
                <b-col md="4" xl="4" sm="4">
                    <b-button style='' class="btn-sm" type="button" @click="deleteAll()" variant="danger">Delete</b-button>
                    <b-button style='' class="btn-sm ml-2" type="button" @click="activeAll()" variant="success">Send To List</b-button>
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
            channel_name: '',
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
          { value: 'Channel 1', text: 'Channel 1'},
          { value: 'Channel 2', text: 'Channel 2'},
          { value: 'Channel 3', text: 'Channel 3'},
          { value: 'Channel 4', text: 'Channel 4'},
          { value: 'Channel 5', text: 'Channel 5'},
          { value: 'Channel 6', text: 'Channel 6'},
          { value: 'Channel 7', text: 'Channel 7'},
          { value: 'Channel 8', text: 'Channel 8'},
          { value: 'Channel 9', text: 'Channel 9'},
          { value: 'Channel 10', text: 'Channel 10'},
          { value: 'Channel 11', text: 'Channel 11'},
          { value: 'Channel 12', text: 'Channel 12'},
          { value: 'Channel 13', text: 'Channel 13'},
          { value: 'Channel 14', text: 'Channel 14'},
          { value: 'Channel 15', text: 'Channel 15'},
          { value: 'Channel 16', text: 'Channel 16'},
          { value: 'Channel 17', text: 'Channel 17'},
          { value: 'Channel 18', text: 'Channel 18'},
          { value: 'Channel 19', text: 'Channel 19'},
          { value: 'Channel 20', text: 'Channel 20'},
          { value: 'Channel 21', text: 'Channel 21'},
          { value: 'Channel 22', text: 'Channel 22'},
          { value: 'Channel 23', text: 'Channel 23'},
          { value: 'Channel 24', text: 'Channel 24'},
          { value: 'Channel 25', text: 'Channel 25'},
          { value: 'Channel 26', text: 'Channel 26'},
          { value: 'Channel 27', text: 'Channel 27'},
          { value: 'Channel 28', text: 'Channel 28'},
          { value: 'Channel 29', text: 'Channel 29'},
          { value: 'Channel 30', text: 'Channel 30'},
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
                { label: 'Channel Name', class: 'text-center' },
                { label: 'URL', class: 'text-center' },
                { label: 'Link', class: 'text-center' },
                { label: 'Action', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'index' },
            { key: 'channel_name' },
            { key: 'video_url' },
            { key: 'link' },
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
        loadData () {
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.getData(baseUrl, 'api/video-warehouse/list', params).then(response => {
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
            RestApi.postData(baseUrl, `api/video-warehouse/delete-all`, { data: itemList }).then(response => {
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
            RestApi.postData(baseUrl, `api/video-warehouse/active-all`, { data: itemList }).then(response => {
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