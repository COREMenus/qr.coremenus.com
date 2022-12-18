<template>
  <div>
    <button
      class="fixed top-3 right-1 border-2 w-7 h-7 z-40 rounded-md text-center text-sm"
      :style="{
        borderColor: settings.accent_color,
        color: settings.accent_color,
      }"
      @click.stop="menu = !menu"
    >
      <i class="fa-solid fa-globe"></i>
    </button>
    <transition name="grow">
      <div
        v-if="menu"
        class="absolute w-40 right-1 rounded-md text-center z-40 top-12 border-2"
        :style="{ backgroundColor: settings.background_color, borderColor:borderColor}"
      >
      <!-- :style="{ backgroundColor: settings.background_color }" -->
        <ul>
            <li 
            class="py-2"
            :style="{ borderColor: borderColor }"
            >
                <nuxt-link :to="switchLocalePath(settings.default_language)">
                    {{languages[settings.default_language].native}}
                </nuxt-link>
                
            </li>
          <li
            v-for="(language, i) in settings.enabled_languages"
            :key="i"
            class="py-2"
            :style="{ borderColor: borderColor }"
          >
            <nuxt-link :to="switchLocalePath(language)">
                {{ languages[language].native }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
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
    ...mapGetters(['bgText', 'borderColor']),
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
    ...mapMutations(['setLocale', 'setDir'])
  }
}
</script>

<style scoped>
li {
  border-bottom: 0.3px solid;
}

.grow-enter-active,
.grow-leave-active {
  transition: all 0.5s;
}

.grow-enter, .grow-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

.grow-enter-to, .grow-leave {
    transform: translateY(0);
    opacity: 1;
}
</style>
