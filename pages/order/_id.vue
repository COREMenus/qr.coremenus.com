<template>
  <div>
    <div
    v-if="order.status !== 'completed'"
    class="bg-white w-10/12 right-0 left-0 mx-auto py-6 h-80 px-2 rounded-lg font-extralight mt-5">
      <!--  * pending order -->
      <div v-if="order.status === 'pending'" class="text-center">
        <img class="w-32 right-0 left-0 mx-auto" src="/pending.svg" alt="" />
        <h1 class="text-3xl mt-2">{{$t('pending_title')}}</h1>
        <p class="text-xl">{{$t('pending_description')}}</p>
      </div>

      <!-- * declined order -->
      <div v-else-if="order.status === 'declined'" class="text-center">
        <h1 class="text-3xl mt-2">{{$t('declined_title')}}</h1>
        <p class="text-xl">{{$t('declined_description')}}</p>
      </div>

      <!-- * confirmed order -->
      <div v-else-if="order.status === 'confirmed'" class="text-center">
        <img class="w-32 right-0 left-0 mx-auto" src="/confirmed.svg" alt="" />
        <h1 class="text-3xl mt-2">{{$t('confirmed_title')}}</h1>
        <p class="text-xl">{{$t('confirmed_description')}}</p>
      </div>

      <!-- * ready order -->
      <div v-else-if="order.status === 'ready'" class="text-center">
        <img class="w-32 right-0 left-0 mx-auto" src="/ready.svg" alt="" />
        <h1 class="text-3xl mt-2">{{$t('ready_title')}}</h1>
        <p class="text-xl">{{$t('ready_description')}}</p>
      </div>
    </div>
    <!-- * completed -->
    <div v-if="order.status === 'completed'" class="mt-5">

       <div class="text-center font-extralight">
         <h1 class="text-2xl"> {{$t('completed_title')}} </h1>
        <p> {{$t('completed_description')}} </p>
       </div>
      <transition name="collapse" mode="out-in">
        <div v-if="!hasFeedback">
          <feedback-forms :order="order" @feedback="hasFeedback = true"></feedback-forms>
        </div>
        <div v-else-if="hasFeedback">
          <h1 class="text-center mt-5 text-2xl font-bold">
            {{$t('feedback_sent')}}
          </h1>
          <img
            class="w-1/3 right-0 left-0 mx-auto mt-4"
            src="/feedback.svg"
            alt=""
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import FeedbackForms from "~/components/FeedbackForms.vue"

export default {
  components: { FeedbackForms },
  layout: 'order',
  data() {
    return {
      notfound: false,
      order: {},
      error: false,
      hasFeedback: false,
      
    }
  },
  async created() {
    try {
      const orderId = this.$route.params.id
      if (!orderId) {
        this.notfound = true
        return
      }

      const res = await this.$axios.get('/orders/' + orderId)
      this.order = res.data

      if (this.order.feedbacks.length > 0) {
        this.hasFeedback = true
      }

      this.$socket.on('orders:confirm', this.orderConfirmed)
      this.$socket.on('orders:decline', this.orderDecline)
      this.$socket.on('orders:ready', this.orderReady)
      this.$socket.on('orders:complete', this.orderCompleted)
    } catch (error) {
      this.notfound = true
    }
  },
  methods: {
    orderConfirmed() {
      this.order.status = 'confirmed'
    },
    orderDecline() {
      this.order.status = 'declined'
    },
    orderReady() {
      this.order.status = 'ready'
    },
    orderCompleted() {
      this.order.status = 'completed'
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
