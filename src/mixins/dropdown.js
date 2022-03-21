import RestApi, { baseUrl } from '../config/api_config'

export default {
  computed: {
    hasAllDropdownLoaded () {
      return this.$store.state.commonObj.hasDropdownLoaded
    }
  },
  watch: {
    hasAllDropdownLoaded: function (newValue) {
      if (!newValue) {
        this.loadCommonDropdown()
      }
    },
  },
  created () {
    // Loading common dropdowns
    const hasDropdownLoaded = this.$store.state.commonObj.hasDropdownLoaded
    if (!hasDropdownLoaded || window.performance) {
      this.loadCommonDropdown()
    }
  },
  methods: {
    loadCommonDropdown () {
      RestApi.getData(baseUrl, 'api/common-dropdowns', null).then(response => {
        if (response.success) {
          this.$store.commit('mutateDropdown', {
            hasDropdownLoaded: true,
            permissions: response.data.permissions,
            permissionList: response.data.permissionList,
            roleList: response.data.roleList
          })
        }
      })
    }
  }
}
