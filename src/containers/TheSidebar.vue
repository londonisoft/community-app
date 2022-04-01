<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <h5 class="text-center">{{ $t('shop.kurigram_shop') }}</h5>
    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="navData"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import Permissions from '@/mixins/Permissions'

export default {
  mixins: [Permissions],
  name: 'TheSidebar',
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    },
    navData () {
        let filterList = []
        this.$options.nav[0]._children.forEach(item => {
        const itemsData = []
        item.items.forEach(childItem => {
            if (this.$can(childItem.permission)) {
                itemsData.push({
                    name: this.$t(childItem.name),
                    to: childItem.to
                })
            }
        })

        let tmpItem = {}
        if (itemsData.length <1) {
           tmpItem = {
            _name: item._name,
            name: this.$t(item.name),
            to: item.to,
            icon: item.icon,
            items: itemsData,
            permission: item.permission,
            }
        }else{
           tmpItem = {
            _name: item._name,
            name: this.$t(item.name),
            route: item.route,
            icon: item.icon,
            items: itemsData,
            permission: itemsData.permission,
            }
        }
        if (this.$can(item.permission)) {
        // if (true) {
          filterList.push(tmpItem)
        }
       
      })
      return  [
          {
            _name: 'CSidebarNav',
            _children: filterList
          }
        ]
      }
  }
}
</script>
