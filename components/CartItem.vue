<template>
  <div class="flex justify-between mt-6">
    <div class="flex">
      <img
        class="h-20 w-20 object-cover rounded"
        src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
        alt=""
      />
      <div class="mx-3">
        <h3 class="text-sm text-gray-600">{{ product.title }}</h3>
        <div class="flex items-center mt-2">
          <button
            data-testid="-"
            class="text-gray-500 focus:outline-none focus:text-gray-600"
            @click="decrease"
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
              <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
          <span data-testid="quantity" class="text-gray-700 mx-2">{{
            quantity
          }}</span>
          <button
            data-testid="+"
            class="text-gray-500 focus:outline-none focus:text-gray-600"
            @click="quantity++"
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
              <path
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <span class="text-gray-600">${{ product.price }}</span>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    decrease() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
  },
};
</script>
