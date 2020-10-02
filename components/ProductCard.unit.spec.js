import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard';
import { makeServer } from '@/miragejs/server';
import { cartState } from '@/state';

describe('ProductCard - unit', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  const mountProductCard = () => {
    const product = server.create('product', {
      title: 'Relógio bonito',
      price: '23.00',
      image:
        'https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    });
    return {
      wrapper: mount(ProductCard, {
        propsData: {
          product,
        },
      }),
      product,
    };
  };

  it('should match snapshot', () => {
    const { wrapper } = mountProductCard();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should mount the component', () => {
    const { wrapper } = mountProductCard();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('Relógio bonito');
    expect(wrapper.text()).toContain('$23.00');
  });

  it('should add item to cartState on button click', async () => {
    const { wrapper } = mountProductCard();

    await wrapper.find('button').trigger('click');

    expect(cartState.items).toHaveLength(1);
  });

  it.todo('should ensure product is not added to the cart twice');
});
