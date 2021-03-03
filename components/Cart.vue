<template>
  <div
    class="fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300"
    :class="{ hidden: !isOpen }"
    data-testid="shopping-cart"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-2xl font-medium text-gray-700">Your cart</h3>
      <button
        v-if="hasProducts"
        data-testid="clear-cart-button"
        @click="$cart.clearProducts()"
      >
        clear cart
      </button>
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
      data-testid="cart-item"
    />
    <h3 v-if="!hasProducts">Cart is empty</h3>
    <form data-testid="checkout-form" @submit.prevent="checkout">
      <div v-if="hasProducts" class="mt-4">
        <hr />
        <label
          class="block text-gray-700 mt-2 text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        data-testid="checkout-button"
        type="submit"
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
      </button>
    </form>
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
      default: () => {
        /* istanbul ignore next */
        return [];
      },
    },
  },
  data() {
    return {
      email: '',
    };
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
    checkout() {
      /* istanbul ignore else */
      if (this.email) {
        this.$emit('checkout', { email: this.email });
      }
    },
  },
};
</script>
