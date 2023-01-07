<template>
  <div>
    <product-modal ref="productModal" :product="product"> </product-modal>
    <div
      class="h-32 flex flex-row items-start gap-2 shadow-md relative"
      @click="openProduct"
    >
      <img
        class="rounded-sm w-32 h-32 object-cover object-center"
        :src="
          product.images[0] ||
          'https://cdn.coremenus.com/a8c5540a-c80f-46b6-9174-efddefbdca9e'
        "
        alt=""
      />
      <div class="flex flex-col">
        <span class="text-lg">{{ fields.name }}</span>
        <p class="text-sm text-opacity-60 overflow-hidden description w-full">
          {{ fields.description }}
        </p>
        <Price class="absolute bottom-2 " :price="product.price" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Price from './price.vue'
import ProductModal from './ProductModal.vue'
export default {
  name: 'ProductComponent',
  components: { ProductModal, Price },
  props: ['product'],
  data() {
    return {
      modal: false,
      options: [],
    }
  },
  computed: {
    ...mapGetters(['currencySymbol']),
    ...mapState(['dir']),
    fields() {
      // this.product.$getters('getFields')(this.product, this.$i18n.locale)
      const f = this.product.$getters('getFields')
      return f(this.product, this.$i18n.locale)
    },
  },
  methods: {
    openProduct() {
      this.$refs.productModal.modal = true
    },
  },
}
</script>

<style></style>
