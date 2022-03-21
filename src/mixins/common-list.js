import RestApi, { baseUrl } from '@/config/api_config'
import iziToast from 'izitoast';

export default {
    data () {
        return {
          pagination: {
            currentPage: 1,
            totalRows: 0,
            perPage: 10,
            slOffset: 1
          },
          editId: 0
        }
    },
    computed: {
        loading () {
          return this.$store.state.static.loading
        },
        listReload () {
          return this.$store.state.static.listReload
        },
        loadingState () {
          if (this.listReload) {
            return true
          } else if (this.loading) {
            return true
          } else {
            return false
          }
        },
        itemList () {
          return this.$store.state.list
        }
    },
    watch: {
      listReload: function (n) {
        if (n) {
          this.loadData()
        }
      }
    },
    methods: {
      resetId () {
        this.editItemId = 0
      },
      edit (item) {
        this.$bvModal.show('modal-1')
        this.editId = item.id
      },
      searchData () {
        this.loadData()
      },
      paginationData (data) {
        this.pagination.currentPage = data.current_page
        this.pagination.totalRows = data.total
        this.pagination.slOffset = this.pagination.perPage * this.pagination.currentPage - this.pagination.perPage + 1
      },
      toggleStatus (uri, item) {
        this.$swal({
            title: 'Are you sure to change status ?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            focusConfirm: false
        }).then((result) => {
            if (result.isConfirmed) {
            this.delete(uri, item)
            }
        })
      },
      delete (uri, item) {
        this.$store.dispatch('mutedLoad', { listReload: false })
        RestApi.deleteData(baseUrl, uri + '/'+ item.id).then(response => {
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
        })
      },
      setReturnData (payload) {
        this.search = Object.assign(this.search, payload)
      },
      getStoreData (storeName, id) {
        const storeData = this.$store.state.commonObj[storeName].find(item => item.value === parseInt(id))
        if (typeof storeData === 'undefined') {
          return ''
        } else {
          return storeData.text
        }
      }
    }
}
