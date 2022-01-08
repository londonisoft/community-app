<template>
  <router-view></router-view>
</template>

<script>
import RestApi , { baseUrl } from './config/api_config'
export default {
  name: 'App',
  data (){
    return {
      name: ''
    }
  },
  created() {
  },
  methods: {
    async dataList () {
        const result = await RestApi.getData(baseUrl, 'api/all-psermission')
        window.Permissions = result;
        console.log(result)
    }
  }
}

</script>

<style lang="scss">
  @import 'assets/scss/style';
</style>
