<template>
<div>
    <CRow>
    <CCol col>
      <CCard accent-color="success">
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                      <strong> Refer Income History</strong>
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <b-overlay :show='loading'>
                <div class="overflow-auto">
                    <b-table thead-class="bg-light text-dark" emptyText="Data Not Found" small show-empty bordered hover :items="itemList" :fields="fields">
                        <template v-slot:cell(index)="data">
                            {{ $n(data.index + pagination.slOffset) }}
                        </template>
                        <template v-slot:cell(task_type)="data">
                            {{ data.item.ads_work.title }}
                        </template>
                        <template v-slot:cell(created_at)="data">
                           {{  data.item.created_at | dateFormat }}
                        </template>
                        <template v-slot:cell(action)="data">
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
                { label: 'Refer Name', class: 'text-center' },
                { label: 'Refer Email', class: 'text-center' },
                { label: 'Work Name', class: 'text-center' },
                { label: 'Amount', class: 'text-center' },
                { label: 'Date', class: 'text-center' },
            ]

            let keys = []
            keys = [
            { key: 'id' },
            { key: 'name' },
            { key: 'email' },
            { key: 'task_type' },
            { key: 'amount' },
            { key: 'created_at' },
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