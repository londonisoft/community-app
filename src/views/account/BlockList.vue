<template>
<div>
    <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                    <strong>All Block Account List</strong>
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
                            <router-link :to='`/users/profile?id=` + data.item.user_id' >
                                {{ data.item.name }}
                            </router-link>
                        </template>
                        <template v-slot:cell(account_name)="data">
                            Account ({{ parseInt(data.item.id) + 100 }})
                        </template>
                        <template v-slot:cell(status)="data">
                            <span class="badge badge-success" v-if="data.item.status == 1">Active</span>
                            <span class="badge badge-danger" v-else>Block</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <b-button v-if="data.item.status == 2" title="Active" class="btn btn-success ml-2 btn-sm" @click="changeStatus(data.item)"> <i class="ri-check-line"></i></b-button>
                            <b-button v-else title="Block" class="ml-2 btn btn-danger btn-sm" @click="changeStatus(data.item)"><i class="ri-close-line"></i></b-button>
                            <b-button class="btn btn-success btn-sm ml-1" v-b-modal.account @click="edit(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
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
        <b-modal id="account"
            header-bg-variant="primary"
            header-text-variant="light"
            title="Edit Account" hide-footer>
            <div>
                <Form :id='editId'/>
            </div>
        </b-modal>
      </CCard>
    </CCol>
  </CRow>
</div>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import { ValidationObserver } from 'vee-validate'
import iziToast from 'izitoast';
import Form from '../../componests/user/Form'

export default {
    components: {
        ValidationObserver,
        Form
    },
    created () {
        this.loadData ()
    },
    data() {
      return {
        search: {
            name: '',
            email: ''
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
            return this.$store.state.list
        },
        fields () {
            const labels = [
                { label: 'Sl No', class: 'text-left' },
                { label: 'Username', class: 'text-center' },
                { label: 'Name', class: 'text-center' },
                { label: 'Mobile', class: 'text-center' },
                { label: 'Account Name', class: 'text-center' },
                { label: 'Point', class: 'text-center' },
                { label: 'Status', class: 'text-center' },
                { label: 'Action', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'id' },
            { key: 'username' },
            { key: 'name' },
            { key: 'email' },
            { key: 'account_name' },
            { key: 'point' },
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
        changeStatus (item) {
            this.toggleStatus(item)
        },
        toggleStatus (item) {
            RestApi.deleteData(baseUrl, `api/account/status/${item.id}`).then(response => {
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
            RestApi.getData(baseUrl, 'api/account/list', params).then(response => {
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
