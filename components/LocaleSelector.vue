<template>
  <div class="p-2">
    <button
      class="py-2 px-1.5 shadow-md w-24 rounded-md text-sm flex justify-between items-center"
      @click.stop="menu = !menu">
      <i class="fa-solid fa-globe opacity-50"></i>
      <span> {{ languages[$i18n.locale].native }} </span>
    </button>
    <ul
      v-if="menu"
      class="w-24 shadow-lg absolute text-center text-sm mt-2"
      :style="{ backgroundColor: settings.background_color }"
    >
      <!-- Default Language -->
      <li class="p-2 flex items-center justify-between">
        <div
          class="w-3 h-3 rounded-full opacity-60 border-2"
          :style="{
            backgroundColor: isSelected(settings.default_language)
              ? bgText
              : settings.background_color,
            borderColor: bgText,
          }"
        ></div>
        <nuxt-link :to="switchLocalePath(settings.default_language)">
          {{ languages[settings.default_language].native }}
        </nuxt-link>
      </li>

      <!-- Other Languages -->
      <li
        v-for="(language, i) in settings.enabled_languages"
        :key="i"
        class="p-2 flex items-center justify-between"
      >
        <div
        class="w-3 h-3 rounded-full opacity-60 border-2"
          :style="{
            backgroundColor: isSelected(language)
              ? bgText
              : settings.background_color,
            borderColor: bgText,
          }"
        ></div>
        <nuxt-link :to="switchLocalePath(language)">
          {{ languages[language].native }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import languages from '@/assets/json/languages.json'
export default {
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['bgText', 'borderColor', 'accentText']),
    languages() {
      return languages
    },
  },
  mounted() {
    document.addEventListener('click', () => {
      this.menu = false
    })
  },
  methods: {
    ...mapMutations(['setLocale', 'setDir']),
    isSelected(language) {
      return this.$i18n.locale === language
    },
  },
}
</script>

<style scoped>
.grow-enter-active,
.grow-leave-active {
  transition: all 0.5s;
}

.grow-enter,
.grow-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.grow-enter-to,
.grow-leave {
  transform: translateY(0);
  opacity: 1;
}
</style>
