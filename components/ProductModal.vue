<template>
  <transition name="slide-up">
    <div
      v-if="container"
      class="absolute w-full h-full bottom-0 right-0 rounded-t-xl overflow-y-auto z-50"
      :style="{ background: settings.background_color }"
    >
      <!-- TODO: Multiple Images -->
      <button 
      class="absolute h-10 w-10 text-lg bg-black text-white rounded-full top-4"
      :class="dir === 'ltr' ? 'left-5' : 'right-5'"
      @click="closeModal">
        <i
          class="fa-solid"
          :class="dir === 'ltr' ? 'fa-arrow-left' : 'fa-arrow-right'"
        ></i>
      </button>
      <img
        class="w-full h-48 object-cover object-center rounded-sm"
        :src="product.images[0] || '/no-image.jpg'"
        alt=""
      />
      <div class="px-4">
        <!-- * Product Name -->
        <div class="text-2xl mt-3">
          {{ fields.name }}
        </div>

        <div class="grid grid-flow-row grid-cols-5">
          <div v-for="(warning, i) in product.warnings" :key="`warning-${i}`">
            {{ warning }}
          </div>
          <div
            v-for="(label, i) in product.labels"
            :key="`label-${i}`"
            class="text-center"
          >
            {{ label }}
          </div>
        </div>

        <!-- * Product Options -->
        <div class="flex flex-col gap-2 my-3 options">
          <div
            v-for="option in options"
            :key="option.id"
            class="flex items-center gap-3 border-opacity-40 pb-2"
            @click="selectedOption = option.id"
          >
            <div
              class="w-4 h-4 rounded-sm border-2"
              :style="{
                borderColor: settings.accent_color,
                backgroundColor:
                  option.id === selectedOption ? settings.accent_color : '',
              }"
            ></div>
            <div
              class="flex justify-between flex-1"
              :style="{
                color:
                  option.id === selectedOption ? settings.accent_color : bgText,
              }"
            >
              <span>{{ optionFields(option).name }}</span>
              <span>{{ currencySymbol }} {{ option.price }}</span>
            </div>
          </div>
        </div>

        <!-- * Notes -->
        <textarea
          v-if="enableOrdering"
          v-model="note"
          rows="3"
          :placeholder="$t('notes')"
          class="border-2 rounded-md p-2 text-lg w-full mt-3 mb-20 bg-transparent"
          :style="{ borderColor: borderColor }"
        >
        </textarea>

        <div
          v-if="enableOrdering"
          class="fixed w-full right-0 h-20 mt-3 py-3 bottom-0 flex items-center justify-around border-t-2 border-opacity-30"
          :style="{ background: settings.background_color }"
        >
          <button
            :disabled="amount < 1"
            :class="{ 'bg-opacity-50': amount < 1 }"
            class="text-center text-xl p-2 w-32 rounded-md"
            :style="{
              backgroundColor: settings.accent_color,
              color: accentText,
            }"
            @click="add"
          >
            {{ $t('addToBag') }}
          </button>
          <div class="flex justify-between gap-1 w-32 text-center">
            <button class="text-3xl" @click="decrement">-</button>
            <input
              v-model="amount"
              readonly
              :min="1"
              type="number"
              class="bg-transparent w-20 text-center text-3xl"
            />
            <button class="text-3xl" @click="increment">+</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import Option from '~/models/option.model'
import OptionTranslation from '~/models/option_translation.model'
// import ProductOption from './ProductOption.vue'
export default {
  //   components: { ProductOption },
  props: ['product'],
  data() {
    return {
      container: false,
      modal: false,
      products: [],
      note: '',
      amount: 1,
      selectedOption: '',
    }
  },
  computed: {
    ...mapState(['settings', 'locale', 'enableOrdering', 'dir']),
    ...mapGetters(['accentText', 'bgText', 'currencySymbol', 'borderColor']),
    options() {
      return Option.query().where('ProductId', this.product.id).all()
    },
    fields() {
      // this.product.$getters('getFields')(this.product, this.$i18n.locale)
      const f = this.product.$getters('getFields')
      return f(this.product, this.$i18n.locale)
    },
  },
  watch: {
    modal(newModal, oldModal) {
      this.products = []
      this.note = ''
      this.amount = 1
      this.selectedOption = ''
      setTimeout(() => {
        this.container = newModal
      }, 100)
    },
  },
  methods: {
    ...mapMutations('bag', ['addItem']),
    optionFields(option) {
      const fields = {
        name: option.name,
      }
      const translation = OptionTranslation.query()
        .where('OptionId', option.id)
        .where('locale', this.$i18n.locale)
        .first()
      if (!translation) return fields
      fields.name = translation.name
      fields.description = translation.description
      return fields
    },
    increment() {
      this.amount += 1
      this.$emit('add', this.option)
    },
    decrement() {
      this.amount <= 1 ? (this.amount = 1) : (this.amount -= 1)
    },
    add() {
      if (this.amount < 1) return
      let price = 0
      let option = null
      if (this.selectedOption) {
        option = this.options.find((o) => o.id === this.selectedOption)
        price = option.price
      } else {
        price = this.product.price
      }
      const item = {
        ProductId: this.product.id,
        product: this.product,
        option,
        quantity: this.amount,
        note: this.note,
        ProductOptionId: this.selectedOption || null,
        price,
      }
      this.addItem(item)
      this.closeModal()
    },
    closeModal() {
      this.container = false
      setTimeout(() => {
        this.modal = false
      }, 400)
    },
  },
}
</script>

<style>
.option-divider {
  border: 1px solid rgba(220, 220, 220, 0.203);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-leave,
.slide-up-enter-to {
  transform: translateY(0);
}
</style>
