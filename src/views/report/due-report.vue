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
                    <CIcon name="cil-justify-center"/><strong> Due Report</strong>
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <b-overlay :show='loading'>
                <div class="overflow-auto">
                    <table class="table table-sm table-bordered">
                        <tr>
                            <th rowspan="2" class="text-center">SL NO</th>
                            <th rowspan="2" class="text-center">Customer Name</th>
                            <th rowspan="2" class="text-center">Customer ID</th>
                            <th colspan="2" class="text-center">Paid Detail</th>
                            <th rowspan="2" class="text-center">Total Paid</th>
                            <th rowspan="2" class="text-center">Loan Amount</th>
                            <th rowspan="2" class="text-center">Due Amount</th>
                        </tr>
                        <tr>
                            <th class="text-center">Pay Date</th>
                            <th class="text-center">Amount</th>
                        </tr>
                        <slot v-for="(item, indx) in itemList">
                            <tr v-if="item.payments.length == 0" :key="indx">
                                <td>{{ indx+1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.cust_id }}</td>
                                <td></td>
                                <td>0</td>
                                <td>{{ getTotal(item.payments) }}</td>
                                <td>{{ item.loan_amount }}</td>
                                <td>{{ item.loan_amount - getTotal(item.payments) }}</td>
                            </tr>
                            <slot v-for="(itm, index) in item.payments">
                                <tr v-if="index == 0" :key="index">
                                    <td :rowspan="item.payments.length">{{ indx+1 }}</td>
                                    <td :rowspan="item.payments.length">{{ item.name }}</td>
                                    <td :rowspan="item.payments.length">{{ item.cust_id }}</td>
                                    <td>{{ itm.pay_date | dateFormat }}</td>
                                    <td>{{ itm.amount }}</td>
                                    <td :rowspan="item.payments.length">{{ getTotal(item.payments) }}</td>
                                    <td :rowspan="item.payments.length">{{ item.loan_amount }}</td>
                                    <td :rowspan="item.payments.length">{{ item.loan_amount - getTotal(item.payments) }}</td>
                                </tr>
                                <tr v-else :key="index">
                                    <td>{{ itm.pay_date | dateFormat }}</td>
                                    <td>{{ itm.amount }}</td>
                                </tr>
                            </slot>
                        </slot>
                        <tr>
                            <th colspan="5" class="text-right">Total : </th>
                            <th colspan="1" class="">{{ getTotalPaid(itemList) }}</th>
                            <th class="">{{ getTotalLoan(itemList) }}</th>
                            <th class="">{{ getTotalDue(itemList) }}</th>
                        </tr>
                    </table>
                </div>
            </b-overlay>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</div>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import Input from '../../components/common/Input'
import commonList from '@/mixins/common-list'

export default {
    mixins: [commonList],
    components: {
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
                { label: 'amount', class: 'text-center' },
                { label: 'Date', class: 'text-center' }
            ]

            let keys = []
            keys = [
            { key: 'index' },
            { key: 'name' },
            { key: 'cust_id' },
            { key: 'amount' },
            { key: 'pay_date' }
            ]
            return labels.map((item, index) => {
                return Object.assign(item, keys[index])
            })
        }
    },
    methods: {
        loadData () {
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.getData(baseUrl, 'api/due-report/list', params).then(response => {
                if (response.success) {
                    this.$store.dispatch('setList', response.data)
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        },
        getTotal (arr) {
            return arr.reduce((amount, object) => {
                return amount + object.amount;
            }, 0)
        },
        getTotalLoan (arr) {
            return arr.reduce((loan_amount, object) => {
                return loan_amount + object.loan_amount;
            }, 0)
        },
        getTotalPaid (arr) {
            const tmparray = arr.map(item => {
                const totalPay = item.payments.reduce((amount, object) => {
                    return amount + object.amount;
                }, 0)
                return Object.assign(item, { total_payment: totalPay })
            })
            return tmparray.reduce((total_payment, object) => {
                return total_payment + object.total_payment;
            }, 0)
        },
        getTotalDue (arr) {
            const tmparray = arr.map(item => {
                const totalPay = item.payments.reduce((amount, object) => {
                    return amount + object.amount;
                }, 0)
                return Object.assign(item, { total_due: item.loan_amount - totalPay })
            })
            return tmparray.reduce((total_due, object) => {
                return total_due + object.total_due;
            }, 0)
        }
    }
}
</script>