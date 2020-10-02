import Vue from 'vue';

export const cartState = Vue.observable({
  open: false,
  items: [],
});
