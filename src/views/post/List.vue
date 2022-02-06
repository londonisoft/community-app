<template>
<div>
    <CRow>
    <CCol col>
      <CCard>
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                    <CIcon name="cil-justify-center"/><strong> Post List</strong>
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <b-overlay :show='loading'>
                <div class="overflow-auto">
                    <b-table thead-class="bg-light text-dark" emptyText="Data Not Found" show-empty bordered hover :items="itemList" :fields="fields">
                        <template v-slot:cell(index)="data">
                            {{ $n(data.index + pagination.slOffset) }}
                        </template>
                        <template v-slot:cell(description)="data">
                            <span>{{ data.item.description | subStr }}</span>
                        </template>
                        <template v-slot:cell(photo)="data">
                            <img :src="baseUrl+'/posts/'+data.item.photo" width="70px">
                        </template>
                        <template v-slot:cell(status)="data">
                            <span class="badge badge-warning" v-if="data.item.status == 1">Pending</span>
                            <span class="badge badge-success" v-if="data.item.status == 2">Approve</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button v-if="parseInt(data.item.status) !== 2" title="Approve" class="btn btn-success ml-2 btn-sm" @click="changeStatus(data.item, 2)"> <i class="ri-check-line"></i></b-button>
                            <b-button v-if="parseInt(data.item.status) !== 1" title="Pending" class="ml-2 btn btn-warning btn-sm" @click="changeStatus(data.item, 1)"><i class="ri-close-line"></i></b-button>
                            <b-button title="Reject" class="ml-2 btn btn-danger btn-sm" @click="remove(data.item)"><i class="ri-close-line"></i></b-button>
                            <b-button class="btn btn-success btn-sm ml-2" v-b-modal.modal-1 @click="edit(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>

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
      title="View Post" hide-footer>
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
        search: {
            name: ''
        },
        pagination: {
            perPage: 10,
            currentPage: 1,
            total: 0
        },
        editId: '',
        baseUrl: baseUrl
      }
    },
    computed: {
        itemList () {
            return this.$store.state.list
        },
        fields () {
            const labels = [
                { label: 'Sl No', class: 'text-left' },
                { label: 'Image', class: 'text-center' },
                { label: 'Description', class: 'text-center' },
                { label: 'Status', class: 'text-center' },
                { label: 'Action', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'id' },
            { key: 'photo' },
            { key: 'description' },
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
        edit (item) {
            this.editId = item.id
        },
        searchData () {
            this.loadData()
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
            RestApi.putData(baseUrl, `api/post/toggle-status/${item.id}`, { status: statusId }).then(response => {
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
        remove (item) {
            this.$swal({
                title: 'Are you sure to delete ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                this.removePost(item)
                }
            })
        },
        removePost (item) {
            RestApi.putData(baseUrl, `api/post/remove/${item.id}`).then(response => {
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
            RestApi.getData(baseUrl, 'api/post/list', params).then(response => {
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
            return string.substring(0, 20) + '...';
        }
    }
}
</script>