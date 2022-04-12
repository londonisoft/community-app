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
                                        <Select @return-value="setReturnData({ month: $event})" :input="{ cols: 3, type: 'text', name: 'month', rules: '', vmodel: search.month, options: months }"/>
                                    </b-col>
                                    <b-col md="6">
                                        <Select @return-value="setReturnData({ year: $event})" :input="{ cols: 3, type: 'text', name: 'year', rules: '', vmodel: search.year, options: years }"/>
                                    </b-col>
                                    <b-col md =6 lg =6 sm =6>
                                        <Select @return-value="setReturnData({ division_id: $event})" :input="{ cols: 3, type: 'text', name: 'division_id', rules: '', vmodel: search.division_id, options: divisionList }"/>
                                    </b-col>
                                    <b-col md =6 lg =6 sm =6>
                                        <Select @return-value="setReturnData({ district_id: $event})" :input="{ cols: 3, type: 'text', name: 'district_id', rules: '', vmodel: search.district_id, options: districtList }"/>
                                    </b-col>
                                    <b-col md =6 lg =6 sm =6>
                                        <Select @return-value="setReturnData({ upazilla_id: $event})" :input="{ cols: 3, type: 'text', name: 'upazilla_id', rules: '', vmodel: search.upazilla_id, options: upazillaList }"/>
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
                    <CIcon name="cil-justify-center"/><strong> Send SMS</strong>
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <div class="row">
                <b-col md="2" xl="2" sm="2">
                    <b-form-checkbox v-model="checkAll">Check All</b-form-checkbox>
                </b-col>
            </div>
            <b-overlay :show='loading'>
                <div class="overflow-auto">
                    <table class="table table-sm table-bordered">
                        <tr>
                            <th rowspan="" class="text-center">SL NO</th>
                            <th rowspan="" class="text-center">Customer Name</th>
                            <th rowspan="" class="text-center">Customer ID</th>
                            <th rowspan="" class="text-center">Mobile</th>
                            <th rowspan="" class="text-center">Payable Amount</th>
                            <th rowspan="" class="text-center">Paid Amount</th>
                            <th rowspan="" class="text-center">Due Amount</th>
                            <th rowspan="" class="text-center">Pay Status</th>
                        </tr>
                        <slot v-for="(item, indx) in itemList">
                            <tr :key="indx">
                                <td>
                                    <b-form-checkbox v-model="item.select">{{ indx+1 }}</b-form-checkbox>
                                </td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.cust_id }}</td>
                                <td>{{ item.mobile }}</td>
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
                            <th colspan="4" class="text-right">Total : </th>
                            <th colspan="1" class="">{{ getTotalPayable(itemList) }}</th>
                            <th colspan="1" class="">{{ getTotalPaid(itemList) }}</th>
                            <th class="">{{ getTotalDue(itemList) }}</th>
                        </tr>
                    </table>
                </div>
                <div class="row">
                    <b-col md =8 lg =8 sm =8>
                        <TextArea @return-value="setReturnData({ message: $event})" :input="{ cols: 12, type: 'text', name: 'message', rules: '', vmodel: search.message }"/>
                    </b-col>
                    <b-col md =4 lg =4 sm =4>
                        <br>
                        <b-button @click="sendMessage" type="button" class="btn-font mt-2" variant="primary"><i class="fa fa-right-sign"></i> Send Message</b-button>
                    </b-col>
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
import TextArea from '../../components/common/TextArea'
import commonList from '@/mixins/common-list'
import iziToast from 'izitoast';

export default {
    mixins: [commonList],
    components: {
        Input,
        Select,
        TextArea
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
            month: '',
            year: '',
            division_id: '',
            district_id: '',
            upazilla_id: '',
            message: ''
        },
        options: [],
        districtList: [],
        upazillaList: [],
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
        ],
        checkAll: false
      }
    },
    watch: {
        'search.division_id': function (n, o) {
            if (n !== o) {
                this.districtList =  this.$store.state.commonObj.districtList.filter(item => item.division_id === n)
            }
        },
        'search.district_id': function (n, o) {
            if (n !== o) {
                this.upazillaList = this.$store.state.commonObj.upazillaList.filter(item => item.district_id === n)
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
    computed: {
        divisionList () {
            return this.$store.state.commonObj.divisionList
        },
        customerList () {
            return this.$store.state.commonObj.customerList
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
        },
         sendMessage () {
            this.$swal({
                title: 'Are you sure to send message ?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                focusConfirm: false
            }).then((result) => {
                if (result.isConfirmed) {
                this.submitAll()
                }
            })
        },
        submitAll () {
            if (this.itemList.length <= 0 || !this.search.message) {
                iziToast.error({
                    title: 'Error',
                    message: "Please enter message and check customer."
                })
                return false
            }
            const itemList = this.itemList.filter(item => item.select === true).map(item => {
                return item.mobile
            })
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.postData(baseUrl, `api/due-report/send`, { message: this.search.message, data: itemList.join() }).then(response => {
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
    }
}
</script>