<template>
  <div
    v-if="modal"
    class="fixed w-full h-full z-50 overflow-scroll flex flex-col gap-5"
    :style="{ background: settings.background_color, color: bgText }"
  >
    <!-- * Header -->
    <div
      :style="{ borderColor: borderColor }"
      class="flex gap-3 h-16 p-3 border-b-2 items-center"
    >
      <button class="text-3xl" @click="modal = false">
        <i
          class="fa-solid"
          :class="dir === 'ltr' ? 'fa-arrow-left' : 'fa-arrow-right'"
        ></i>
      </button>
      <span class="text-2xl">{{ $t('bag_items') }}</span>
    </div>

    <!-- * Card is Empty -->
    <div v-if="items.length < 1" class="text-xl text-center">
      Your cart is empty
    </div>

    <!-- * Content -->
    <div v-else class="flex flex-col flex-1 p-2">
      <!-- * Items -->
      <div class="flex flex-col gap-3 overflow-scroll flex-1">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="h-24 rounded-md md:w-96 flex gap-2"
        >
          <img
            class="object-cover object-center w-24 h-24 rounded-md"
            :src="item.product.images[0]"
            alt=""
          />
          <div class="flex flex-col justify-between p-2 flex-1">
            <div class="flex flex-col">
              <span> {{ productFields(item.product).name }} </span>
              <span v-if="item.option" class="text-sm text-opacity-70">
                {{ optionFields(item.option).name }}</span
              >
            </div>

            <div class="flex gap-3 justify-between">
              <div class="flex justify-between w-20">
                <button class="text-lg p-1" @click="decrementItem(item)">
                  -
                </button>
                <input
                  class="w-14 bg-transparent text-center text-lg"
                  type="number"
                  :value="item.quantity"
                />
                <button class="text-lg p-1" @click="incrementItem(item)">
                  +
                </button>
              </div>
              <button
                class=" text-red-500 py-0.5 px-2 text-xl rounded-sm"
                @click="removeItem(item)"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <form class="flex flex-col gap-3" @submit.prevent="placeOrder">

        <!-- * Summary -->
        <div class="flex flex-col gap-1">
          <div class="flex gap-1">
            <span>{{ $t('subtotal') }}:</span>
            <Price :price="subtotal" />
          </div>
          <div class="flex gap-1">
            <span>{{ $t('taxes') }}:</span> <Price :price="tax" />
          </div>
          <div class="flex gap-1">
            <span>{{ $t('total') }}:</span> <Price :price="total" />
          </div>
        </div>

        <!-- * Notes -->
        <div class="flex flex-col gap-1">
          <label for="notes">{{ $t('notes') }}</label>
          <textarea
            v-model="noteText"
            name="notes"
            rows="3"
            class="border-2 p-1 rounded-md bg-transparent"
            :style="{ borderColor: borderColor }"
          ></textarea>
        </div>

        <!-- * Name -->
        <div class="flex flex-col">
          <label for="carNumber">{{ $t('name') }}</label>
          <input
            v-model="customerName"
            type="text"
            required
            :style="{ borderColor: borderColor }"
            class=" p-1 w-full border-2 rounded-md bg-transparent"
          />
        </div>

        <!-- * Car Number -->
        <div v-if="type == 'car'" class="flex flex-col">
          <label for="carNumber">{{ $t('car_number') }}</label>
          <input
            v-model="carNumberText"
            type="text"
            required
            :style="{ borderColor: borderColor }"
            class=" p-1 w-full border-2 rounded-md bg-transparent"
          />
        </div>

        <button
          class="p-2 bg-gray-900 w-full text-white rounded-md"
          type="submit"
        >
          {{ $t('place_order') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import Price from './price.vue'
import OptionTranslation from '~/models/option_translation.model'
export default {
  components: { Price },
  data() {
    return {
      modal: false,
    }
  },
  computed: {
    ...mapState('bag', ['items', 'type', 'note', 'car_number', 'customer_name']),
    ...mapState(['settings', 'dir']),
    ...mapGetters(['bgText', 'currencySymbol', 'borderColor']),
    subtotal() {
      return this.items
        .map((i) => parseInt(i.price) * i.quantity)
        .reduce((p, c) => p + c, 0)
    },
    tax() {
      return this.subtotal * this.settings.tax
    },
    total() {
      return this.tax + this.subtotal
    },
    noteText: {
      get() {
        return this.note
      },
      set(value) {
        return this.setNote(value)
      },
    },
    carNumberText: {
      get() {
        return this.car_number
      },
      set(value) {
        return this.setCarNumber(value)
      },
    },
    customerName: {
      get() {
        return this.customer_name
      },
      set(value) {
        return this.setCustomerName(value)
      }
    }
  },
  methods: {
    ...mapActions('bag', ['order']),
    ...mapMutations('bag', [
      'setStatus',
      'removeItem',
      'incrementItem',
      'decrementItem',
      'setNote',
      'setCarNumber',
      'setCustomerName'
    ]),
    productFields(product) {
      return product.$getters('getFields')(product, this.$i18n.locale)
    },
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
      return fields
    },
    placeOrder() {
      if (this.items.length < 1) return
      if (!this.customer_name) return
      
      if (this.type === "car" && !this.car_number) return;

      this.order()
      this.setStatus('pending')
      this.$socket.on('orders:new', (order) => {
        this.$router.push(
          this.localePath({
            name: 'order-id',
            params: {
              id: order.id,
            },
          })
        )
        this.modal = false
      })
    },
  },
}
</script>

<style>
.bag-modal {
  width: 1000px;
}
.product-card {
  width: 90%;
}
</style>
