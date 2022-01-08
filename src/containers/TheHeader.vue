<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <!-- <CHeaderNavItem class="">
        <b-dropdown block id="dropdown-offset" no-caret offset="25" :text="$t('sidebar.categories')" variant="link" class="btn-sm">
          <b-dropdown-item href="#">Add Product</b-dropdown-item>
          <b-dropdown-item href="#">Product Report</b-dropdown-item>
          <b-dropdown-item href="#">Manage Product</b-dropdown-item>
        </b-dropdown>
      </CHeaderNavItem>| -->

    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-bell"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-list"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-envelope-open"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink v-if="this.$i18n.locale === 'bn'" >
          <a @click="langChange('en')"><img width="30px" src="../../public/images/en.png"/></a>
        </CHeaderNavLink>
        <CHeaderNavLink v-else>
          <a @click="langChange('bn')"><img width="30px" src="../../public/images/bn.png"/></a>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import { mapActions } from 'vuex'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  methods:{
    langChange (lang) {
      this.langChangeState(lang)
      this.$i18n.locale = lang
    },
    ...mapActions({
      langChangeState: 'setLangAction'
    })
  }
 
  
}
</script>