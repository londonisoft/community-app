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
      RestApi.getData(baseUrl, 'common-dropdowns', null).then(response => {
        if (response.success) {
          this.$store.commit('mutateDropdown', {
            hasDropdownLoaded: true,
            categoryList: response.data.categoryList,
            subCategoryList: response.data.subCategoryList,
            contentList: response.data.contentList,
            subContentList: response.data.subContentList
          })
        }
      })
    }
  }
}
