<template>
  <div class="px-5 mt-6">
    <section-component
      v-for="section in sections"
      :key="section.id"
      :section="section"
    ></section-component>
  </div>
</template>

<script>
import SectionComponent from '~/components/SectionComponent.vue'
import Section from '~/models/section.model'
export default {
  components: { SectionComponent },
  computed: {
    sections() {
      return Section.query().where('MenuId', this.$route.params.menuId).all()
    },
  },
}
</script>

<style>
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
