import Vue from 'vue';

const initialState = {
  open: false,
  items: [],
};

export class CartManager {
  state;

  constructor() {
    this.state = Vue.observable(initialState);
  }

  open() {
    this.state.open = true;

    return this.state;
  }

  close() {
    this.state.open = false;

    return this.state;
  }

  productIsInTheCart(product) {
    return !!this.state.items.find(({ id }) => id === product.id);
  }

  hasProducts() {
    return this.state.items.length > 0;
  }

  addProduct(product) {
    if (!this.productIsInTheCart(product)) {
      this.state.items.push(product);
    }

    return this.state;
  }

  removeProduct(productId) {
    this.state.items = [
      ...this.state.items.filter((product) => product.id !== productId),
    ];

    return this.state;
  }

  clearProducts() {
    this.state.items = [];

    return this.state;
  }

  clearCart() {
    this.clearProducts();
    this.close();

    return this.state;
  }
}
