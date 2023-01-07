<template>
  <div
    class="border-b-2 border-opacity-40 h-36"
    :style="{ borderColor: addAlpha(bgText, 0.1) }"
  >
    <div class="menu-slider flex flex-row gap-1 overflow-x-auto p-3">
      <!-- Menus -->
      <nuxt-link
        v-for="menu in menus"
        :key="menu.id"
        :to="formatTo(menu)"
        class="flex flex-col menu-continaer overflow-hidden"
      >
        <img
          class="h-20 w-20 rounded-full object-cover block right-0 left-0 mx-auto"
          :src="menu.imageURL"
          alt=""
        />
        <div class="h-10 text-center">
          <span class="text-center">
            {{getMenuValues(menu).name}}
        </span>
        </div>
        <transition name="fadeInLeft">
          <hr
            v-if="$route.params.menuId === menu.id"
            :style="{ borderColor: settings.accent_color }"
          />
        </transition>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Menu from '~/models/menu.model'
import MenuTranslation from '~/models/menu_translation.model'
export default {
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['bgText']),
    menus() {
        return Menu.all()
    }
  },
  methods: {
    getMenuValues(menu) {
        const values = {
            name: menu.name,
            description: menu.description
        }
        const translation = MenuTranslation.query().where('MenuId', menu.id).where('locale', this.$i18n.locale).first()
        if (!translation) return values
        values.name = translation.name
        values.description = translation.description
        return values
    },
    formatTo(menu) {
      return this.localePath({
        name: 'shop-shopId-menuId',
        params: {
          shopId: this.$route.params.shopId,
          menuId: menu.id,
        },
        query: this.$route.query,
      })
    },
    addAlpha(color, opacity) {
      const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255)
      return color + _opacity.toString(16).toUpperCase()
    },
  },
}
</script>

<style>
.fadeInLeft-enter-active,
.fadeInLeft-leave-active {
  transition: all 0.5s;
}
.fadeInLeft-enter,
.fadeInLeft-leave {
  opacity: 0;
  transform: translateX(-20px);
}

.fadeInRight-enter-active,
.fadeInRight-leave-active {
  transition: all 0.5s;
}
.fadeInRight-enter,
.fadeInRight-leave {
  opacity: 0;
  transform: translateX(20px);
}

.menu-slider::-webkit-scrollbar {
  display: none;
}

.menu-continaer {
  min-width: 100px;
}

.menu-continaer hr {
  border: 5px solid auto;
  width: 50px;
  right: 0;
  left: 0;
  margin: 0 auto;
}
</style>
