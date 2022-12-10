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
                                        <Input @return-value="setReturnData({ start_date: $event})" :input="{ cols: 3, type: 'date', name: 'start_date', rules: '', vmodel: search.start_date }"/>
                                    </b-col>
                                    <b-col md="6">
                                        <Input @return-value="setReturnData({ end_date: $event})" :input="{ cols: 3, type: 'date', name: 'end_date', rules: '', vmodel: search.end_date }"/>
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
                    <CIcon name="cil-justify-center"/><strong>  পেমেন্ট রিপোর্ট</strong>
                </div>
                <div class="col-md-6 text-right">
                    <b-button type="button" @click="print()" class="btn-font" variant="primary"><i class="ri-printer-line"></i> Print</b-button>
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <b-overlay :show='loading'>
                <div class="overflow-auto" id="print">
                    <div class="text-center mt-3">
                        <h4>শিমুল এন্টারপ্রাইজ</h4>
                        <h6>পেমেন্ট রিপোর্ট</h6>
                        <h6>তারিখ : {{ currentDate() }}</h6>
                    </div>
                    <hr>
                    <table class="table table-sm table-bordered">
                        <tr>
                            <th rowspan="2" class="text-center">ক্রমিক নং</th>
                            <th rowspan="2" class="text-center">গ্রাহকের নাম</th>
                            <th rowspan="2" class="text-center">গ্রাহক আইডি</th>
                            <th colspan="3" class="text-center">পরিশোধিত বিবরণ</th>
                            <th rowspan="2" class="text-center">মোট পরিশোধিত</th>
                            <th rowspan="2" class="text-center">ঋণের পরিমাণ</th>
                            <th rowspan="2" class="text-center">বাকির পরিমাণ</th>
                        </tr>
                        <tr>
                            <th class="text-center">ক্রমিক নং</th>
                            <th class="text-center">পরিশোধ তারিখ</th>
                            <th class="text-center">টাকা</th>
                        </tr>
                        <slot v-for="(item, indx) in itemList">
                            <tr v-if="item.payments.length == 0" :key="indx">
                                <td>{{ indx+1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.cust_id }}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{{ item.loan_amount - getTotal(item.payments) }}</td>
                            </tr>
                            <slot v-for="(itm, index) in item.payments">
                                <tr v-if="index == 0" :key="index">
                                    <td :rowspan="item.payments.length">{{ indx+1 }}</td>
                                    <td :rowspan="item.payments.length">{{ item.name }}</td>
                                    <td :rowspan="item.payments.length">{{ item.cust_id }}</td>
                                    <td class="text-center">{{ index+1 }}</td>
                                    <td>{{ itm.pay_date | dateFormat }}</td>
                                    <td>{{ itm.amount }}</td>
                                    <td :rowspan="item.payments.length">{{ getTotal(item.payments) }}</td>
                                    <td :rowspan="item.payments.length">{{ item.loan_amount }}</td>
                                    <td :rowspan="item.payments.length">{{ parseFloat(item.loan_amount - getTotal(item.payments)).toFixed(2) }}</td>
                                </tr>
                                <tr v-else :key="index+1">
                                    <td class="text-center">{{ index+1 }}</td>
                                    <td>{{ itm.pay_date | dateFormat }}</td>
                                    <td>{{ itm.amount }}</td>
                                </tr>
                            </slot>
                        </slot>
                        <tr>
                            <th colspan="6" class="text-right">Total : </th>
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
        currentDate () {
            let today = new Date()
            return today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
        },
        print() {
            const prtHtml = document.getElementById('print').innerHTML
            let stylesHtml = ''
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
            stylesHtml += node.outerHTML
            }
            const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
            WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                <title>Customer Reprot</title>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);
            WinPrint.document.close()
            WinPrint.focus()
            WinPrint.print()
            WinPrint.close()
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
                return parseFloat(amount) + parseFloat(object.amount);
            }, 0)
        },
        getTotalLoan (arr) {
            return arr.reduce((loan_amount, object) => {
                return parseFloat(loan_amount) + parseFloat(object.loan_amount);
            }, 0)
        },
        getTotalPaid (arr) {
            const tmparray = arr.map(item => {
                const totalPay = item.payments.reduce((amount, object) => {
                    return parseFloat(amount )+ parseFloat(object.amount);
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
                    return parseFloat(amount) + parseFloat(object.amount);
                }, 0)
                return Object.assign(item, { total_due: parseFloat(item.loan_amount) - parseFloat(totalPay) })
            })
            const total = tmparray.reduce((total_due, object) => {
                return parseFloat(total_due) + parseFloat(object.total_due);
            }, 0)
            return parseFloat(total).toFixed(2)
        }
    }
}
</script>