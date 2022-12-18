<template>
  <div 
  v-if="modal" class="fixed w-full h-full z-50 overflow-scroll" 
  :style="{background: settings.background_color}">

  <!-- * Header -->
    <div 
    :style="{borderColor: borderColor}"
    class="flex gap-3 h-16 p-3 border-b-2 items-center">
      <button class="text-3xl" @click="modal = false">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <span class="text-2xl">{{$t('bag_items')}}</span>
    </div>

    <!-- * Content -->
    <div class="p-2 mt-5">

        <!-- * Items -->
      <div class="flex flex-col gap-3 overflow-scroll">
        <div
          v-for="item,i in items"
          :key="i"
          class="h-24 rounded-md md:w-96 flex gap-2"
        >
          <img
            class="object-cover object-center w-24 h-24"
            :src="item.product.images[0]"
            alt=""
          />
          <div class="flex flex-col justify-between p-2 flex-1">
            <div class="flex flex-col">
              <span> {{productFields(item.product).name}} </span>
              <span v-if="item.option" class="text-sm text-opacity-70"> {{optionFields(item.option).name}}</span>
            </div>

            <div class="flex gap-3 justify-between">
              <div class="flex justify-between w-20">
                <button class="text-lg p-1" @click="decrementItem(item)">-</button>
                <input
                  class="w-14 bg-transparent text-center text-lg"
                  type="number"
                  :value="item.quantity"
                />
                <button class="text-lg p-1" @click="incrementItem(item)">+</button>
              </div>
              <button
              class="bg-red-500 text-white py-0.5 px-2 text-xs rounded-sm"
                @click="removeItem(item)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- * Notes -->
      <div class="flex flex-col gap-1 mt-5">
        <label for="notes">{{$t('notes')}}</label>
        <textarea
          name="notes"
          rows="3"
          class="border-2 p-1 rounded-md bg-transparent"
          :style="{borderColor: borderColor}"
        ></textarea>
      </div>


        <!-- * Summary -->
      <div class=" flex flex-col gap-1 mt-5">
        <span>
            {{$t('subtotal')}}: {{currencySymbol}} {{ subtotal }}
        </span>
        <span>
            {{$t('taxes')}}: {{ currencySymbol}} {{ tax }}
        </span>
        <span>
            {{$t('total')}}: {{currencySymbol}} {{ total }}
        </span>
      </div>

      <!-- * Car Number -->
      <div v-if="type == 'car'" class="flex flex-col mt-5">
        <label for="carNumber">{{$t('car_number')}}</label>
        <input 
        type="text" 
        :style="{borderColor: borderColor}"
        class="text-xl p-1 w-full border-2 rounded-md">
      </div>
      
      <button class="mt-5 p-2 bg-gray-900 w-full text-white rounded-md" @click="placeOrder"> {{$t('place_order')}} </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import OptionTranslation from '~/models/option_translation.model'
export default {
  data() {
    return {
      modal: false,
    }
  },
  computed: {
    ...mapState('bag', ['items', 'type']),
    ...mapState(['settings']),
    ...mapGetters(['bgText', 'currencySymbol', 'borderColor']),
    subtotal() {
        return this.items.map(i => i.price).reduce((p, c) => p + c, 0)
    },
    tax() {
        return this.subtotal * this.settings.tax
    },
    total() {
        return this.tax + this.subtotal
    },
  },
  methods: {
    ...mapActions('bag', ['order']),
    ...mapMutations('bag', ['setStatus', 'removeItem', 'incrementItem', 'decrementItem']),
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
      this.order()
      this.setStatus('pending')
      this.$socket.on('orders:new', (order) => {
        this.$router.push(this.localePath({
          name: 'order-id',
          params: {
            id: order.id,
          },
        }))
        this.modal = false
      })

    },
  }
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
