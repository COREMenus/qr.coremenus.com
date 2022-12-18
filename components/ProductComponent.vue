<template>
  <div>
    <product-modal ref="productModal" :product="product"> </product-modal>
    <div
      class="h-72 flex flex-col items-start"
      @click="openProduct"
    >
      <img
        width="180"
        height="180"
        class="rounded-lg w-44 h-44 object-cover object-center"
        :src="product.images[0] || 'https://cdn.coremenus.com/a8c5540a-c80f-46b6-9174-efddefbdca9e'"
        alt=""
      />
      <span class="font-semibold">{{currencySymbol}} {{ product.price }}</span>
      <span class="text-xl">{{ fields.name }}</span>
      <p class="text-sm text-opacity-60 overflow-hidden description w-full">
        {{ fields.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductModal from './ProductModal.vue'
export default {
  name: 'ProductComponent',
  components: { ProductModal },
  props: ['product'],
  data() {
    return {
      modal: false,
      options: [],
    }
  },
  computed: {
    ...mapGetters(['currencySymbol']),
    fields() {
        // this.product.$getters('getFields')(this.product, this.$i18n.locale)
        const f = this.product.$getters('getFields')
        return f(this.product, this.$i18n.locale)
    }
  },
  methods: {
    openProduct() {
        this.$refs.productModal.modal = true
    }
  },
}
</script>

<style></style>
