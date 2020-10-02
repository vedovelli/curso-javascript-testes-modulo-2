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

  addProduct(product) {
    const exists = !!this.state.items.find(({ id }) => id === product.id);

    if (!exists) {
      this.state.items.push(product);
    }

    return this.state;
  }
}
