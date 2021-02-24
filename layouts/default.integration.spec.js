import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import axios from 'axios';
import DefaultLayout from '@/layouts/default';
import Cart from '@/components/Cart';
import { CartManager } from '@/managers/CartManager';
import { makeServer } from '@/miragejs/server';

jest.mock('axios', () => ({
  post: jest.fn(() => ({ order: { id: 111 } })),
  setHeader: jest.fn(),
}));

const cartManager = new CartManager();

function mountComponent(
  providedCartManager = cartManager,
  providedAxios = axios
) {
  return mount(DefaultLayout, {
    mocks: {
      $cart: providedCartManager,
      $axios: providedAxios,
    },
    stubs: {
      Nuxt: true,
    },
  });
}

describe('Default Layout', () => {
  let server;
  let products;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    products = server.createList('product', 2);
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should set email header on Axios when Cart emmits checkout event', async () => {
    const wrapper = mountComponent();
    const cartComponent = wrapper.findComponent(Cart).vm;
    const email = 'vedovelli@gmail.com';

    await cartComponent.$emit('checkout', { email });

    expect(axios.setHeader).toHaveBeenCalledTimes(1);
    expect(axios.setHeader).toHaveBeenCalledWith('email', email);
  });

  it('should call Axios.post with the right endpoint and send products', async () => {
    jest.spyOn(cartManager, 'getState').mockReturnValue({
      items: products,
    });

    jest.spyOn(cartManager, 'clearProducts');

    const wrapper = mountComponent(cartManager);
    const cartComponent = wrapper.findComponent(Cart).vm;
    const email = 'vedovelli@gmail.com';

    await cartComponent.$emit('checkout', { email });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/api/order', { products });
  });

  it('should call cartManager.clearProducts on success', async () => {
    jest.spyOn(cartManager, 'getState').mockReturnValue({
      items: products,
    });

    jest.spyOn(cartManager, 'clearProducts');

    const wrapper = mountComponent(cartManager);
    const cartComponent = wrapper.findComponent(Cart).vm;
    const email = 'vedovelli@gmail.com';

    await cartComponent.$emit('checkout', { email });

    expect(cartManager.clearProducts).toHaveBeenCalledTimes(1);
  });

  it('should display error notice when Axios.post fails', async () => {
    jest.spyOn(cartManager, 'getState').mockReturnValue({
      items: products,
    });

    jest.spyOn(axios, 'post').mockRejectedValue({});

    const wrapper = mountComponent(cartManager, axios);
    const cartComponent = wrapper.findComponent(Cart).vm;

    await cartComponent.$emit('checkout', { email: 'vedovelli@gmail.com' });
    await flushPromises();

    expect(wrapper.find('[data-testid="error-message"]').exists()).toBe(true);
  });
});
