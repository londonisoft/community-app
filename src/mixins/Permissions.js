export default {
  created () {
  },
  methods: {
    $can(permissionName) {
      const Permissions = this.$store.state.commonObj.permissions;
      if(Permissions.toString().indexOf(permissionName) !== -1) {
        return true
      } else {
        return false
      }
    }
  }
}