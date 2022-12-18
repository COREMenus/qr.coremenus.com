<template>
  <div>
    <h1 class="text-center mt-5 text-2xl font-bold">{{$t('write_feedback')}}</h1>
    <form class="w-full px-5 mt-2 flex flex-col gap-3" @submit.prevent="submit">
      <div class="flex flex-row gap-2 w-full justify-center">
        <div v-for="i in 5" :key="i" @click="feedback.rating = i">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="feedback.rating >= i ? ' text-yellow-400' : 'text-gray-400'"
            class="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
      </div>
      <!-- Name -->
      <div class="field">
        <label for="name">{{$t('name')}}</label>
        <input v-model="feedback.name" type="text" />
      </div>
      <div class="field">
        <label for="email">{{$t('email')}}</label>
        <input
          v-model="feedback.email"
          type="email"
          placeholder="Eg. someone@example.com"
        />
      </div>

      <div class="field">
        <label for="comment">{{$t('feedback')}}</label>
        <textarea
          id="feedback"
          v-model="feedback.comment"
          name="feedback"
          cols="3"
          rows="3"
        ></textarea>
      </div>

      <button class="bg-gray-800 text-white py-1 rounded-md">{{$t('submit')}}</button>
    </form>
  </div>
</template>

<script>
export default {
    props: ['order'],
  data() {
    return {
      feedback: {
        email: '',
        name: '',
        rating: 0,
        comment: '',
      },
    }
  },
  methods: {
    async submit() {
      try {
        await this.$axios.post(`/feedbacks/${this.order.id}`, {
          ...this.feedback,
          OrderId: this.order.id,
          ShopId: this.order.ShopId,
        })
        this.$emit('feedback')
      } catch (error) {
        console.log(error)
        this.error = true
      }
    },
  },
}
</script>

<style scoped>
form .field {
  @apply flex flex-col gap-1;
}

input,
textarea {
  @apply bg-gray-100 py-0.5 px-2 rounded-md border-2 border-gray-200 flex-1;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 1s;
  position: absolute;
  width: 100%;
}

.collapse-enter,
.collapse-leave-to {
  height: 0px;
}

.collapse-enter-to,
.collapse-leave {
  height: 100%;
}
</style>
