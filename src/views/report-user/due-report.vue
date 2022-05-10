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
                                    <b-col md =6 lg =6 sm =6>
                                        <Select @return-value="setReturnData({ hr_id: $event})" :input="{ cols: 3, type: 'text', name: 'Select HR', rules: '', vmodel: search.hr_id, options: HrList }"/>
                                    </b-col >
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
                    <CIcon name="cil-justify-center"/><strong> Customer Report</strong>
                </div>
                <div class="col-md-6 text-right">
                    <b-button type="button" @click="print()" class="btn-font" variant="primary"><i class="ri-printer-line"></i> Print</b-button>
                </div>
            </div>
        </CCardHeader>
        <CCardBody>
            <b-overlay :show='loading'>
                <div class="overflow-auto" id='print'>
                    <div class="text-center mt-3">
                        <h4>Krishan Unnayan Sangstha (KAS)</h4>
                        <h6>Yearly Payment Raport - {{ search.year }}</h6>
                        <h6>Date : {{ currentDate() }}</h6>
                    </div>
                    <hr>
                    <table class="table table-sm table-bordered">
                        <tr>
                            <th rowspan="" class="text-center">SL NO</th>
                            <th rowspan="" class="text-center">HR Name</th>
                            <th rowspan="" class="text-center">Customer Name</th>
                            <th rowspan="" class="text-center">Customer ID</th>
                            <th rowspan="" class="text-center">Jan</th>
                            <th rowspan="" class="text-center">Feb</th>
                            <th rowspan="" class="text-center">Mar</th>
                            <th rowspan="" class="text-center">Apr</th>
                            <th rowspan="" class="text-center">May</th>
                            <th rowspan="" class="text-center">Jun</th>
                            <th rowspan="" class="text-center">Jul</th>
                            <th rowspan="" class="text-center">Aug</th>
                            <th rowspan="" class="text-center">Sep</th>
                            <th rowspan="" class="text-center">Oct</th>
                            <th rowspan="" class="text-center">Nov</th>
                            <th rowspan="" class="text-center">Dec</th>
                        </tr>
                        <slot v-for="(item, indx) in itemList">
                            <tr :key="indx">
                                <td>{{ indx+1 }}</td>
                                <td>{{ item.hr_name }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.cust_id }}</td>
                                <td>{{ item.jan }}</td>
                                <td>{{ item.feb }}</td>
                                <td>{{ item.mar }}</td>
                                <td>{{ item.apr }}</td>
                                <td>{{ item.may }}</td>
                                <td>{{ item.jun }}</td>
                                <td>{{ item.jul }}</td>
                                <td>{{ item.aug }}</td>
                                <td>{{ item.sep }}</td>
                                <td>{{ item.oct }}</td>
                                <td>{{ item.nov }}</td>
                                <td>{{ item.dec }}</td>
                            </tr>
                        </slot>
                        <tr>
                            <th colspan="4" class="text-right">Total : </th>
                            <th v-for="(month, index) in monthList" colspan="1" :key="index" class="">{{ getTotal(itemList, month.value) }}</th>
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
        monthList: [
            {
                value: 'jan',
                text: 'January'
            },
            {
                value: 'feb',
                text: 'February'
            },
            {
                value: 'mar',
                text: 'March'
            },
            {
                value: 'apr',
                text: 'April'
            },
            {
                value: 'may',
                text: 'May'
            },
            {
                value: 'jun',
                text: 'June'
            },
            {
                value:'jul',
                text: 'July'
            },
            {
                value: 'aug',
                text: 'August'
            },
            {
                value: 'sep',
                text: 'September'
            },
            {
                value: 'oct',
                text: 'October'
            },
            {
                value: 'nov',
                text: 'November'
            },
            {
                value: 'dec',
                text: 'December'
            }
        ]
      }
    },
    computed: {
        customerList () {
            return this.$store.state.commonObj.customerList
        },
        HrList () {
          return this.$store.state.commonObj.HrList
        },
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
        currntMonth () {
            const d = new Date();
            this.search.month = d.getMonth() + 1;
            this.search.year = d.getFullYear();
        },
        loadData () {
            const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
            this.$store.dispatch('mutedLoad', { loading: true})
            RestApi.getData(baseUrl, 'api/due-report/customer-report', params).then(response => {
                if (response.success) {
                    this.$store.dispatch('setList', response.data)
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        },
        getTotal (arr, month) {
            return arr.reduce((amount, object) => {
                return amount + object[month];
            }, 0)
        }
    }
}
</script>