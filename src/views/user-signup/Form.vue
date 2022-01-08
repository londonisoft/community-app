<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
          <b-overlay :show="loading">
            <b-row>
                <b-col lg="4" sm="12">
                    <CCard>
                        <CCardBody>
                            <b-row>
                                <b-col>
                                    <div class='text-center'>
                                        <img width='70%' src="/images/profile.png">
                                        <h4>{{ formData.name }}</h4>
                                        <p class="text-primary">{{ formData.email }}</p>
                                    </div>
                                    <div>
                                        <table class='table table-sm'>
                                            <tr>
                                                <th>Total Point</th>
                                                <td>: {{ formData.amount }}</td>
                                            </tr>
                                            <tr>
                                                <th>Paid</th>
                                                <td>: {{ 0 }}</td>
                                            </tr>
                                            <tr>
                                                <th>Member Since</th>
                                                <td>: {{ formData.created_at | dateFormat }}</td>
                                            </tr>
                                            <tr>
                                                <th>Status</th>
                                                <td> : 
                                                    <span v-if="parseInt(formData.status) === 1" class="badge badge-success">Active</span>
                                                    <span v-else class="badge badge-danger">block</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="text-center">
                                        <button v-if="parseInt(formData.status) === 2" class="btn btn-sm btn-success mt-1" @click="changeStatus(formData)" style="width:70%"><i class="ri-check-line"></i> Active</button>
                                        <button v-else class="btn btn-sm btn-danger mt-1" @click="changeStatus(formData)" style="width:70%"><i class="ri-close-line"></i> Block</button>
                                    </div>
                                </b-col>
                            </b-row>
                        </CCardBody>
                    </CCard>
                </b-col>
                <b-col lg="8" sm="12">
                    <CCard>
                        <CCardBody>
                            <div>
                                <b-tabs content-class="mt-3">
                                    <b-tab title="Info" active>
                                        <table class="table table-sm table-bordered">
                                            <tr>
                                                <td width="30%">User ID</td>
                                                <td> : {{ formData.id }}</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td> : {{ formData.name }}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td> : {{ formData.email }}</td>
                                            </tr>
                                            <tr>
                                                <td>Total Amount</td>
                                                <td> : {{ formData.amount }}</td>
                                            </tr>
                                            <tr>
                                                <td>Join</td>
                                                <td> : {{ formData.total_refer }}</td>
                                            </tr>
                                            <tr>
                                                <td>Register Date</td>
                                                <td> : {{ formData.created_at | dateFormat }}</td>
                                            </tr>
                                            <tr>
                                                <td>Refer Code</td>
                                                <td> : {{ formData.own_refer_id }}</td>
                                            </tr>
                                        </table>
                                    </b-tab>
                                    <b-tab title="Change Info">
                                        <UserInfoChange :id="$route.query.id" />
                                    </b-tab>
                                </b-tabs>
                            </div>
                        </CCardBody>
                    </CCard>
                </b-col>
            </b-row>
          </b-overlay>
      </b-col>
      <b-col lg="12" sm="12" class="mb-2">
          <button @click="setBtn('widthdraw', 'Withdraw')" :class="(btn === 'widthdraw') ? `btn btn-success ml-2` : `btn btn-secondary ml-2`">Widthdraw List</button>
          <button @click="setBtn('refer', 'ReferUser')" :class="(btn === 'refer') ? `btn btn-success ml-2` : `btn btn-secondary ml-2`">Refer List</button>
      </b-col>
      <b-col v-if="formData.id" lg="12" sm="12">
          <component :is="comp" :user_id="formData.id" :own_refer_id="formData.own_refer_id" ></component>
      </b-col>
    </b-row>
    <b-modal id="modal-1"
    size="lg"
	header-bg-variant="primary"
	header-text-variant="light"
    title="Notification" hide-footer>
    <div>
		<Notification :id='editId'/>
  </div>
  </b-modal>
  </b-container>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import iziToast from 'izitoast';
import Notification from './Notification'
import UserInfoChange from './UserInfoChange'
import Withdraw from './../../componests/user/withdraw'
import ReferUser from './../../componests/user/refer-user'

export default {
  props: ['id'],
  components: {
    Notification,
    UserInfoChange,
    Withdraw,
    ReferUser
    },
  created () {
	if (this.$route.query.id) {
    this.getItem()
    }
  },
  data () {
    return {
      saveBtnName: this.$route.query.id ? 'Update' : 'Save',
      formData: {
		type_id: 0,
        name: ''
      },
      editId: '',
      comp: 'Withdraw',
      btn: 'task',
      loading: false
    }
  },
  computed: {
  },
  methods: {
    setBtn (btnName, CompName) {
        this.btn = btnName
        this.comp = CompName
    },
    edit (item) {
        this.editId = item.id
    },
	getItem () {
        this.loading = true
         RestApi.getData(baseUrl, `api/user-signup/show/${this.$route.query.id}`).then(response => {
                if (response.success) {
                    this.formData = response.data
                }
                this.loading = false
            })
	},
    changeStatus (item) {
        this.$swal({
            title: 'Are you sure to change status ?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            focusConfirm: false
        }).then((result) => {
            if (result.isConfirmed) {
            this.toggleStatus(item)
            }
        })
    },
    toggleStatus (item) {
        RestApi.deleteData(baseUrl, `api/user-signup/user-status/${item.id}`).then(response => {
            if (response.success) {
                this.getItem()
                iziToast.success({
                    title: 'Success!',
                    message: response.message
                })
            } else {
                iziToast.error({
                    title: 'Error!',
                    message: response.message
                })
            }
        })
    },
  }
}
</script>
