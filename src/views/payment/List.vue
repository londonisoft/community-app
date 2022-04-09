<template>
<div>
    <CRow>
    <CCol col>
        <CCard>
            <CCardBody class="">
                <b-row class="p-0 m-0">
                    <b-col class="p-0 m-0">
                        <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                            <b-form  @submit.prevent="handleSubmit(searchData)" @reset.prevent="reset" >
                                <div class="row">
                                    <b-col md="6">
                                        <ValidationProvider name="Customer" vid="customer_id" rules="">
                                            <b-form-group
                                            class="row"
                                            label-cols-sm="3"
                                            label-for="customer_id"
                                            slot-scope="{ valid, errors }"
                                            >
                                            <template v-slot:label>
                                            Customer <span class="text-danger">*</span>
                                            </template>
                                            <v-select
                                                id="customer_id"
                                                label="text"
                                                :reduce="text => text.value"
                                                v-model="search.customer_id"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                :options="options"
                                                >
                                                <b-form-select-option first value="">Select</b-form-select-option>
                                                </v-select>
                                            <div class="invalid-feedback">
                                                {{ errors[0] }}
                                            </div>
                                            </b-form-group>
                                        </ValidationProvider>                                    
                                    </b-col>
                                    <b-col md="6">
                                        <Input @return-value="setReturnData({ cust_id: $event})" :input="{ cols: 3, type: 'text', name: 'cust_id', rules: '', vmodel: search.cust_id }"/>
                                    </b-col>
                                    <b-col md="6">
                                        <Input @return-value="setReturnData({ account_num: $event})" :input="{ cols: 3, type: 'text', name: 'account_num', rules: '', vmodel: search.account_num }"/>
                                    </b-col>
                                    <div class="col-md-12 pt-0 mt-0">
                                        <div class="text-right">
                                            <b-button type="submit" class="btn-font" variant="primary"><i class="ri-search-line"></i> Search</b-button>
                                        </div>
                                    </div>
                                </div>
                            </b-form>
                        </ValidationObserver>
                    </b-col>
                </b-row>
            </CCardBody>
        </CCard>
      <CCard>
        <CCardHeader>
            <div class="row">
                <div class="col-md-6">
                    <CIcon name="cil-justify-center"/><strong> Payment List</strong>
                </div>
                <div class="col-md-6">
                    <div class="text-right">
                          <button v-if="$can('payment-create')" class="btn btn-primary" @click="editId = ''" v-b-modal.modal-1>Add New</button>
                    </div>
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
                        <template v-slot:cell(pay_date)="data">
                            {{ data.item.pay_date | dateFormat }}
                        </template>
                        <template v-slot:cell(status)="data">
                            <span class="badge badge-success" v-if="data.item.status == 1">Active</span>
                            <span class="badge badge-danger" v-else>Inactive</span>
                        </template>
                        <template v-slot:cell(action)="data">
                            <div v-if="$can('payment-status')">
                                <b-button v-if="data.item.status == 2" title="Change Status" class="ml-2 btn btn-success btn-sm" @click="changeStatus(data.item, 1)"><i class="ri-check-line"></i></b-button>
                                <b-button v-else title="Change Status" class="ml-2 btn btn-danger btn-sm" @click="changeStatus(data.item, 2)"><i class="ri-close-line"></i></b-button>
                            </div>
                            <b-button v-if="$can('payment-edit')" class="btn btn-success btn-sm ml-2 mt-1" v-b-modal.modal-1 @click="edit(data.item)"><i class="ri-ball-pen-fill m-0"></i></b-button>
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
      title="Payment Entry" hide-footer>
    <div>
        <Form :id='editId'/>
  </div>
  </b-modal>
</div>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import Form from './Form'
import Input from '../../components/common/Input'
import iziToast from 'izitoast';
import commonList from '@/mixins/common-list'

export default {
    mixins: [commonList],
    components: {
        Form,
        Input
    },
    created () {
        this.loadData ()
    },
    mounted(){
        this.options = this.customerList.map(item => {
            return Object.assign({}, item, { text: item.text + ' (' + item.cust_id + ')' })
        })
    },
    data() {
      return {
        baseUrlLink: baseUrl,
        search: {
            customer_id: '',
            cust_id: '',
            mobile: '',
        },
        options: []
      }
    },
    computed: {
        customerList () {
            return this.$store.state.commonObj.customerList
        },
        fields () {
            const labels = [
                { label: 'Sl No', class: 'text-left' },
                { label: 'Customer', class: 'text-center' },
                { label: 'Customer ID', class: 'text-center' },
                { label: 'Account Num', class: 'text-center' },
                { label: 'amount', class: 'text-center' },
                { label: 'Payment Method', class: 'text-center' },
                { label: 'Date', class: 'text-center' },
                { label: 'Status', class: 'text-center' },
                { label: 'Action', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'index' },
            { key: 'customer_name' },
            { key: 'cust_id' },
            { key: 'account_num' },
            { key: 'amount' },
            { key: 'payment_method' },
            { key: 'pay_date' },
            { key: 'status' },
            { key: 'action' }
            ]
            return labels.map((item, index) => {
                return Object.assign(item, keys[index])
            })
        }
    },
    methods: {
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
            RestApi.putData(baseUrl, `api/payment/status/${item.id}`, { status: statusId }).then(response => {
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
            RestApi.getData(baseUrl, 'api/payment/list', params).then(response => {
                if (response.success) {
                    this.$store.dispatch('setList', response.data.data)
                    this.paginationData(response.data)
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        }
    }
}
</script>