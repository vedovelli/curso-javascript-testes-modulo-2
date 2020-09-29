<template>
  <div
    class="fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300"
    :class="{ hidden: !isOpen }"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-medium text-gray-700">Your cart</h3>
      <button
        data-testid="close-button"
        class="text-gray-600 focus:outline-none"
        @click="close"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <hr class="my-3" />
    <cart-item
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
    <h3 v-if="!hasProducts">Cart is empty</h3>
    <a
      class="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
    >
      <span>Checkout</span>
      <svg
        class="h-5 w-5 mx-2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </a>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem';
export default {
  components: { CartItem },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    hasProducts() {
      return this.products.length > 0;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
