<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <b-row>
            <b-col lg="10" offset-lg="1" sm="12">
                <table class="table table-bordered">
                    <tr>
                        <td>Image</td>
                        <td>
                            <img :src="baseUrl+'/posts/'+formData.photo" width="200px">
                        </td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{{ formData.description }}</td>
                    </tr>
                </table>
            </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import RestApi, { baseUrl } from '../../config/api_config'
import iziToast from 'izitoast';
export default {
  props: ['id'],
  components: {
  },
  created () {
      if (this.id) {
          this.formData = this.getItem()
      }
  },
  data () {
    return {
      saveBtnName: this.id ? 'Update' : 'Save',
      formData: {
        name: '',
        min_amount: ''
      },
      baseUrl: baseUrl
    }
  },
  computed: {
      categoryList () {
        return this.$store.state.commonObj.categoryList
      },
      loading () {
        return this.$store.state.static.loading
      }
  },
  methods: {
    getItem () {
        const item = this.$store.state.list.find(item => item.id === parseInt(this.id))
        return JSON.parse(JSON.stringify(item))
    },
    async register () {
          this.$store.dispatch('mutedLoad', { loading: true, listReload: false })
        let result = null
        if (this.id) {
            result = await RestApi.putData(baseUrl, `${'api/payment-method/update'}/${this.id}`, this.formData)
        } else {
            result = await RestApi.postData(baseUrl,'api/payment-method/store', this.formData)
        }
        this.$store.dispatch('mutedLoad', { loading: false, listReload: true })
        this.$store.dispatch('dropdownLoad', { hasDropdownLoaded: false })
        if (result.success) {
            if (!this.id) {
                this.formData.content = ''
            }
            iziToast.success({
                title: 'Success',
                message: result.message
            })
             this.$bvModal.hide('modal-1')
        } else {
            this.$refs.form.setErrors(result.errors)
        }
    }
  }
}
</script>
