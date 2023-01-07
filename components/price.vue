<template>
  <div
    class="font-semibold flex gap-2"
    :class="dir === 'ltr' ? 'right-2' : 'left-2 flex-row-reverse'"
  >
    <span>
      {{ currencySymbol }}
    </span>
    <span>
      {{ price }} 
    </span>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: "PriceComponent",
  props: ['price'],
  computed: {
    ...mapGetters(['currencySymbol']),
    ...mapState(['dir'])
  }
}
</script>

<style></style>
