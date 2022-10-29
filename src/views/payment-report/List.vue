<template>
<div>
    <CRow>
    <CCol col>
        <CCard>
            <CCardBody class="">
                <b-row class="p-0 m-0">
                    <b-col class="p-0 m-0" >
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
                                        <Input @return-value="setReturnData({ mobile: $event})" :input="{ cols: 3, type: 'text', name: 'mobile', rules: '', vmodel: search.mobile }"/>
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
                    <CIcon name="cil-justify-center"/><strong> পেমেন্ট বকেয়া রিপোর্ট</strong>
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
                        <h6>পেমেন্ট বকেয়া রিপোর্ট</h6>
                        <h6>তারিখ : {{ currentDate() }}</h6>
                    </div>
                    <hr>
                    <b-table thead-class="bg-light text-dark" emptyText="Data Not Found" show-empty bordered hover :items="itemList" :fields="fields">
                        <template v-slot:cell(index)="data">
                            {{ $n(data.index + pagination.slOffset) }}
                        </template>
                        <template v-slot:cell(pay_date)="data">
                            {{ data.item.pay_date | dateFormat }}
                        </template>
                    </b-table>
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
import iziToast from 'izitoast';
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
                { label: 'ক্রমিক নং', class: 'text-left' },
                { label: 'গ্রাহকের নাম', class: 'text-center' },
                { label: 'গ্রাহক আইডি', class: 'text-center' },
                { label: 'মোট পরিশোধিত', class: 'text-center' },
                { label: 'তারিখ', class: 'text-center' },
            ]

            let keys = []
            keys = [
            { key: 'index' },
            { key: 'customer_name' },
            { key: 'cust_id' },
            { key: 'amount' },
            { key: 'pay_date' },
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
            RestApi.getData(baseUrl, 'api/payment/report-list', params).then(response => {
                if (response.success) {
                    this.$store.dispatch('setList', response.data)
                }
                this.$store.dispatch('mutedLoad', { loading: false })
            })
        }
    }
}
</script>