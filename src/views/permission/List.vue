<template>
<div>
    <CRow>
    <CCol>
        <CCard>
            <CCardBody class="">
                <b-row class="p-0 m-0">
                    <b-col class="p-0 m-0">
                        <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                            <b-form  @submit.prevent="handleSubmit(searchData)" @reset.prevent="reset" >
                                <div class="row">
                                    <b-col md="4">
                                        <Input @return-value="setReturnData({ name: $event})" :input="{ cols: 3, type: 'text', name: 'name', rules: 'required', vmodel: search.name }"/>
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
                        <strong>Permission List</strong>
                    </div>
                    <div class="col-md-6 text-right">
                        <button class="btn btn-primary btn-font" @click="editId = ''" v-b-modal.modal-1><i class="ri-add-line"></i> Add New</button>
                    </div>
                </div>
            </CCardHeader>
            <CCardBody>
                <b-overlay :show="loading">
                    <div class="overflow-auto">
                        <b-table thead-class="bg-light text-dark" emptyText="Data Not Found" small show-empty bordered hover :items="itemList" :fields="fields">
                            <template v-slot:cell(index)="data">
                                {{ parseInt(data.index) + parseInt(pagination.slOffset) }}
                            </template>
                            <template v-slot:cell(action)="data">
                                <b-button title="Edit" class="pl-1 pt-0 pr-1 pb-0 btn btn-info ml-1 btn-sm" @click="edit(data.item)"><i class="ri-edit-line"></i></b-button>
                                <!-- <b-button title="Active/Inactive" class="pl-1 pt-0 pr-1 pb-0 btn btn-danger ml-1 btn-sm" @click="changeStatus(data.item)"> <i class="ri-close-circle-line"></i> </b-button> -->
                            </template>
                        </b-table>
                    </div>
                </b-overlay>
                <b-pagination
                class="text-right"
                v-model="pagination.currentPage"
                :total-rows="pagination.totalRows"
                :per-page="pagination.perPage"
                @input="searchData"
                ></b-pagination>
            </CCardBody>
        </CCard>
    </CCol>
  </CRow>
  <transition name="bounce">
     <b-modal id="modal-1"
      size="lg"
    header-bg-variant="primary"
    header-text-variant="light"
      title="Permission Entry" hide-footer>
    <div>
        <Form :id='editId'/>
  </div>
  </b-modal>
  </transition>
</div>
</template>
<script>
import RestApi, { baseUrl } from '@/config/api_config'
import Input from '../../components/common/Input'
import { ValidationObserver } from 'vee-validate'
import Form from './Form'
import commonList from '@/mixins/common-list'

export default {
    mixins: [commonList],
    components: {
        ValidationObserver,
        Input,
        Form
    },
    created () {
        this.loadData()
    },
    data() {
      return {
        search: {
          name: ''
        }
      }
    },
    computed: {
        fields () {
            const labels = [
                { label: 'Sl No', class: 'text-center grid-sl' },
                { label: 'Name', class: 'text-center' },
                { label: 'Action', class: 'text-center grid-action' }
            ]

            let keys = []
            keys = [
            { key: 'index' },
            { key: 'name' },
            { key: 'action' }
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
			RestApi.getData(baseUrl, 'api/permission/list', params).then(response => {
				if (response.success) {
					this.$store.dispatch('setList', response.data.data)
					this.paginationData(response.data)
				}
			    this.$store.dispatch('mutedLoad', { loading: false })
			})
		},
        changeStatus (item) {
            this.toggleStatus('permission/delete', item)
        }
	}
}
</script>