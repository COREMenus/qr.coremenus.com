<template>
  <section v-if="products.length > 0" class="mt-3">
    <span class="text-xl font-semibold">{{ sectionValues.name }}</span>
    <div class="grid grid-cols-1 gap-3 mt-3">
      <product-component
        v-for="product in products"
        :key="product.id"
        :product="product"
      ></product-component>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProductComponent from './ProductComponent.vue'
import Product from '~/models/product.model'
import SectionTranslation from '~/models/section_translation.model'
export default {
  name: 'SectionComponent',
  components: { ProductComponent },
  props: ['section'],
  computed: {
    ...mapGetters(['borderColor']),
    ...mapState(['settings']),
    products() {
      return Product.query().where('SectionId', this.section.id).all()
    },
    sectionValues() {
      const values = {
        name: this.section.name,
        description: this.section.description,
      }
      const translation = SectionTranslation.query()
        .where('SectionId', this.section.id)
        .where('locale', this.$i18n.locale)
        .first()
      if (!translation) return values
      values.name = translation.name
      values.description = translation.description
      return values
    },
  },
  methods: {},
}
</script>

<style></style>
