import { mount } from '@vue/test-utils';
import Vue from 'vue';
import axios from 'axios';
import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';
import { makeServer } from '@/miragejs/server';
import ProductList from '.';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('ProductList - integration', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should mount the component', () => {
    const wrapper = mount(ProductList);
    expect(wrapper.vm).toBeDefined();
  });

  it('should mount the Search component', () => {
    const wrapper = mount(ProductList);
    expect(wrapper.findComponent(Search)).toBeDefined();
  });

  it('should call axios.get on component mount', () => {
    mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/api/products');
  });

  it('should mount the ProductCard component 10 times', async () => {
    const products = server.createList('product', 10);

    axios.get.mockReturnValue(Promise.resolve({ data: { products } }));

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    await Vue.nextTick();

    const cards = wrapper.findAllComponents(ProductCard);

    expect(cards).toHaveLength(10);
  });
});
