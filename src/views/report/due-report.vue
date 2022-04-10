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
                                        <Select @return-value="setReturnData({ month: $event})" :input="{ cols: 3, type: 'text', name: 'month', rules: '', vmodel: search.month, options: months }"/>
                                    </b-col>
                                    <b-col md="6">
                                        <Select @return-value="setReturnData({ year: $event})" :input="{ cols: 3, type: 'text', name: 'year', rules: '', vmodel: search.year, options: years }"/>
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
                            <th rowspan="" class="text-center">SL NO</th>
                            <th rowspan="" class="text-center">Customer Name</th>
                            <th rowspan="" class="text-center">Customer ID</th>
                            <th rowspan="" class="text-center">Payable Amount</th>
                            <th rowspan="" class="text-center">Paid Amount</th>
                            <th rowspan="" class="text-center">Due Amount</th>
                            <th rowspan="" class="text-center">Pay Status</th>
                        </tr>
                        <slot v-for="(item, indx) in itemList">
                            <tr :key="indx">
                                <td>{{ indx+1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.cust_id }}</td>
                                <td>{{ item.pay_amount }}</td>
                                <td>{{ getTotal(item.payments) }}</td>
                                <td>{{ item.pay_amount - getTotal(item.payments) }}</td>
                                <td>
                                    <span class="badge badge-success" v-if="item.payments.length">Paid</span>
                                    <span class="badge badge-danger" v-else>Due</span>
                                </td>
                            </tr>
                        </slot>
                        <tr>
                            <th colspan="3" class="text-right">Total : </th>
                            <th colspan="1" class="">{{ getTotalPayable(itemList) }}</th>
                            <th colspan="1" class="">{{ getTotalPaid(itemList) }}</th>
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
import Select from '../../components/common/Select'
import commonList from '@/mixins/common-list'

export default {
    mixins: [commonList],
    components: {
        Input,
        Select
    },
    created () {
        this.currntMonth()
        this.loadData ()
    },
    mounted(){
       this.options = this.customerList.map(item => {
            return Object.assign({}, item, { text: `${item.text} (${item.cust_id })` })
        })
    },
    data() {
      return {
        baseUrlLink: baseUrl,
        search: {
            customer_id: '',
            cust_id: '',
            month: '',
            year: ''
        },
        options: [],
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
        ]
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
        currntMonth () {
            const d = new Date();
            this.search.month = d.getMonth() + 1;
            this.search.year = d.getFullYear();
        },
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
        getTotalPayable (arr) {
            return arr.reduce((pay_amount, object) => {
                return pay_amount + object.pay_amount;
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
                return Object.assign(item, { total_due: item.pay_amount - totalPay })
            })
            return tmparray.reduce((total_due, object) => {
                return total_due + object.total_due;
            }, 0)
        }
    }
}
</script>