<template>
  <div :dir="dir">
    <BagModal ref="bagModal"></BagModal>
     <!-- * Bag -->
     <button
        v-if="enableOrdering"
        class="fixed bottom-3 right-1 w-16 h-16 z-40 rounded-full text-center text-3xl p-3"
        :style="{ backgroundColor: settings.accent_color, color: accentText }"
        @click="$refs.bagModal.modal = true"
      >
        <i class="fa-solid fa-bag-shopping"></i>
      </button>
    <div
      class="min-h-screen flex flex-col"
      :style="{ color: bgText, background: settings.background_color }"
    >
    <locale-selector></locale-selector>
      <!-- * Logo -->
      <!-- <div>
      <img
        class=" h-24 p-5 w-auto block right-0 left-0 mx-auto"
        src="/core-logo.png"
        alt=""
      />
    </div> -->

      <!-- * Menu Slider -->
      <MenuSlider></MenuSlider>

      <!-- * Main -->
      <div class="pb-12 flex-1">
        <nuxt-child :key="$route.fullPath"></nuxt-child>
      </div>

      <div 
      class="text-center text-sm h-6 fixed bottom-0 w-full"
      :style="{ backgroundColor: settings.background_color }"
      >
        Powered by <a href="http://coremenus.com" class="text-yellow-800">Coremenus</a>
      </div>

     
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import BagModal from '~/components/BagModal.vue'
import LocaleSelector from '~/components/LocaleSelector.vue'
import MenuSlider from '~/components/MenuSlider.vue'

import Menu from '~/models/menu.model'
import Option from '~/models/option.model'
import Product from '~/models/product.model'
import Section from '~/models/section.model'
export default {
  components: { BagModal, MenuSlider, LocaleSelector },
  computed: {
    ...mapState([
      'shop',
      'settings',
      'branch',
      'dir',
      'enableOrdering',
      'branch',
    ]),
    ...mapState('menu', ['menus']),
    ...mapGetters(['bgText', 'accentText']),
    currentMenuIndex() {
      const currentMenu = this.$route.params.menuId
      const index = this.menus.findIndex((m) => m.id === currentMenu)
      return index
    },
  },
  async created() {
    try {
      // RTL
      if (this.$i18n.locale === 'ar') {
        this.setDir('rtl')
      }

      // Fetch the Shop
      const shopId = this.$route.params.shopId
      await this.fetchShop(shopId)

      // Fetch Settings
      await this.fetchSettings()

      // Fetch Branch
      let branchId
      if (this.$route.query.branch) {
        branchId = this.$route.query.branch
        await this.fetchBranch(branchId)
        this.setBranchId(this.branch.id)
        this.setOrdering(true)
      }

      // Order Type
      if (this.$route.query.car) {
        this.setType('car')
        this.setOrdering(this.settings.car_ordering)
      } else if (this.$route.query.table) {
        this.setType('table')
        this.setOrdering(this.settings.table_ordering)
        this.setTableNumber(this.$route.query.car)
      }

      if (this.branch.active === 0) {
        this.$router.push(
          this.localePath({
            name: '404',
          })
        )
        return
      }

      // Fetch Menu Data
      await Menu.api().get(`/menus/${shopId}/menus?branch=${branchId}`)
      await Section.api().get(`/sections/${shopId}/sections`)
      await Product.api().get(`/products/${shopId}/products`)
      await Option.api().get(`/products/options/${shopId}/options`)

      // Open Default Menu
      if (Menu.all().length > 0) {
        this.$router.push(
          this.localePath({
            name: 'shop-shopId-menuId',
            params: {
              shopId: this.$route.params.shopId,
              menuId: Menu.all()[0].id,
            },
            query: this.$route.query,
          })
        )
      }
    } catch (error) {
      this.$router.push('/404')
    }
  },
  methods: {
    ...mapActions(['fetchShop', 'fetchSettings', 'fetchBranch']),
    ...mapActions('menu', ['fetchAllMenus']),
    ...mapMutations('bag', [
      'setType',
      'setCarNumber',
      'setTableNumber',
      'setBranchId',
    ]),
    ...mapMutations(['setOrdering', 'setDir']),
  },
}
</script>
