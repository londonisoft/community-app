import RestApi, { baseUrl } from '@/config/api_config'
import iziToast from 'izitoast';

export default {
    data () {
        return {
            saveBtnName: this.id ? 'Update' : 'Save'
        }
    },
    computed: {
        loading () {
          return this.$store.state.static.loading
        }
    },
    watch: {
      
    },
    methods: {
        async submitHandler (storeUri, updateUri, formData) {
            this.$store.dispatch('mutedLoad', { loading: true, listReload: false })
            let result = null
            if (this.id) {
                result = await RestApi.putData(baseUrl, `${updateUri}/${this.id}`, formData)
            } else {
                result = await RestApi.postData(baseUrl, storeUri, formData)
            }
            this.$store.dispatch('mutedLoad', { loading: false, listReload: true })
            return result
        },
        resultProcess (result) {
            if (result.success) {
                this.$bvModal.hide('modal-1')
                iziToast.success({
                    title: 'Success',
                    message: result.message
                })
                this.$store.dispatch('dropdownLoad', { hasDropdownLoaded: false })
              } else {
                this.$refs.form.setErrors(result.errors)
                iziToast.error({
                  title: 'Error',
                  message: result.message
                })
              }
        },
        getItem () {
            const item = this.$store.state.list.find(item => item.id === parseInt(this.id))
            return JSON.parse(JSON.stringify(item))
        },
        setReturnData (payload) {
            this.formData = Object.assign(this.formData, payload)
        }
    }
}
