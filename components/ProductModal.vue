<template>
  <div
    v-if="modal"
    class="bg-black bg-opacity-50 fixed top-0 right-0 w-full h-full z-50"
    @click.self="closeModal"
  >
    <transition name="slide-up">
      <div
        v-if="container"
        class="fixed modal w-full bottom-0 right-0 rounded-t-xl px-5 overflow-y-auto"
        :style="{ background: settings.background_color }"
      >
        <!-- TODO: Multiple Images -->
        <img
          class="w-full h-48 object-cover right-0 left-0 block mx-auto mt-3 rounded-md"
          :src="product.images[0]"
          alt=""
        />

        <!-- * Product Name -->
        <div class="text-2xl mt-3">
          {{ fields.name }}
        </div>

        <!-- * Product Options -->
        <div class="flex flex-col gap-2 my-3 options">
          <div
            v-for="option in options"
            :key="option.id"
            class="flex items-center gap-3 border-b-2 border-opacity-40 pb-2"
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
    </transition>
  </div>
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
    ...mapState(['settings', 'locale', 'enableOrdering']),
    ...mapGetters(['accentText', 'bgText', 'currencySymbol', 'borderColor']),
    options() {
      return Option.query().where('ProductId', this.product.id).all()
    },
    fields() {
        // this.product.$getters('getFields')(this.product, this.$i18n.locale)
        const f = this.product.$getters('getFields')
        return f(this.product, this.$i18n.locale)
    }
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
.modal {
  height: 90%;
}
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
