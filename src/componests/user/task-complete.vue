<template>
<div>
    <CRow>
    <CCol col>
      <CCard accent-color="success">
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                      <strong> Task Completed</strong>
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <b-overlay :show='loading'>
                <div class="overflow-auto">
                    <b-table thead-class="bg-light text-dark" emptyText="Data Not Found" small show-empty bordered hover :items="itemList" :fields="fields">
                        <template v-slot:cell(index)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template v-slot:cell(task_type)="data">
                            <span v-if="data.item.task_type === 1" >Spin One</span>
                            <span v-if="data.item.task_type === 2">Spin Two</span>
                            <span v-if="data.item.task_type === 3">Math Quiz One</span>
                            <span v-if="data.item.task_type === 4">Math Quiz Two</span>
                            <span v-if="data.item.task_type === 5">Watch Video One</span>
                            <span v-if="data.item.task_type === 6">Watch Video Two</span>
                            <span v-if="data.item.task_type === 7">Scratch card One</span>
                            <span v-if="data.item.task_type === 8">Scratch card Two</span>
                        </template>
                        <template v-slot:cell(status)="data">
                            <span class="badge badge-success" v-if="parseInt(data.item.status) === 1">Completed</span>
                            <span class="badge badge-danger" v-else>Inactive</span>
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
  <b-modal id="modal-1"
    header-bg-variant="primary"
    header-text-variant="light"
      title="Category Entry" hide-footer>
    <div>
        <Form :id='editId'/>
  </div>
  </b-modal>
</div>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
export default {
    props: ['user_id'],
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
                { label: 'Name', class: 'text-center' },
                { label: 'Mobile', class: 'text-center' },
                { label: 'Point', class: 'text-center' },
                { label: 'Date', class: 'text-center' },
                { label: 'Status', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'index' },
            { key: 'name' },
            { key: 'email' },
            { key: 'point' },
            { key: 'created_at' },
            { key: 'status' }
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
        loadData () {
            const params = Object.assign({}, this.search, { user_id: this.user_id, page: this.pagination.currentPage, per_page: this.pagination.perPage })
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.getData(baseUrl, 'api/user-signup/task-list', params).then(response => {
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