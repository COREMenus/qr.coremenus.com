<template>
  <div class="flex gap-3 items-center justify-between">
    <div
      class="flex justify-between h-12 p-3 rounded-md items-center w-full bg-transparent border-2"
      :class="amount > 0 ? 'bg-indigo-500 text-white': 'bg-gray-400 text-black'"
    >
      <span class="text-xl">{{ option.name }}</span>
      <!-- <div class="flex justify-between gap-1 w-24 text-center">
        <button class="text-xl" @click="decrement">-</button>
        <input
        v-model="amount"
        readonly
          :min="0"
          type="number"
          class="bg-transparent w-10 text-center text-xl"
        />
        <button class="text-xl" @click="increment">+</button>
      </div> -->
          <span class="text-xl">{{ option.price }} QAR</span>

    </div>
  </div>
</template>

<script>
export default {
    props: ['option'],
    data() {
        return {
            amount: 0
        }
    },
    methods: {
        increment() {
            this.amount += 1
            this.$emit('add', this.option)
        },
        decrement() {
            this.amount < 1 ? this.amount = 0 : this.amount -= 1
        }
    }
}
</script>

<style></style>
