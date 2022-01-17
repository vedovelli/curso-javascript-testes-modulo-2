import { mount } from '@vue/test-utils';
import Vue from 'vue';
import axios from 'axios';
import ProductList from '.';
import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';
import { makeServer } from '@/miragejs/server';

/**
 * O Jest substitui o método get por sua própria
 * função, a qual ele tem total conhecimento.
 * Isso possibilita fazer assertions tais como
 * quantas vezes o método foi executado e com quais
 * parametros.
 */
jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('ProductList - integration', () => {
  let server;

  /**
   * Este método é executado antes de cada teste
   */
  beforeEach(() => {
    /**
     * Cria uma instancia do MirageJS Server antes da
     * execução de cada teste.
     */
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    /**
     * Desliga a instância do MirageJS server depois
     * da execução de cada teste.
     */
    server.shutdown();

    /**
     * Faz o reset de tudo o que aconteceu com os mocks
     * durante o teste. Por exemplo: zera a contagem
     * de quantas vezes o mock foi executado.
     */
    jest.clearAllMocks();
  });

  /**
   * Retorna uma lista de produtos. A lista é criada pelo
   * server MirageJS. Permite criar produtos com dados
   * específicos junto com os dados gerados pelo Faker.
   * Basta passar no parametro overrides uma lista de
   * objetos com as propriedades que se quer.
   */
  const getProducts = (quantity = 10, overrides = []) => {
    let overrideList = [];

    if (overrides.length > 0) {
      overrideList = overrides.map((override) =>
        server.create('product', override)
      );
    }

    return [...server.createList('product', quantity), ...overrideList];
  };

  /**
   * Monta o componente ProductList, fornecendo as dependências
   * bem como a lista de produtos. Permite passar diferentes
   * quantidades e também solicitar produtos com dados fixos.
   * Por fim, permite também informar se o método axios.get
   * retornará uma Promise.resolve() ou Promise.reject().
   */
  const mountProductList = async (
    quantity = 10,
    overrides = [],
    shouldReject = false
  ) => {
    const products = getProducts(quantity, overrides);

    if (shouldReject) {
      axios.get.mockReturnValue(Promise.reject(new Error('error')));
    } else {
      axios.get.mockReturnValue(Promise.resolve({ data: { products } }));
    }

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    });

    await Vue.nextTick();

    /**
     * O método retona um objeto com o wrapper e também
     * com qualquer outra informação que possa ser necessária
     * para que o teste funcione como se deve.
     */
    return { wrapper, products };
  };

  it('should mount the component', async () => {
    const { wrapper } = await mountProductList();
    expect(wrapper.vm).toBeDefined();
  });

  it('should mount the Search component', async () => {
    const { wrapper } = await mountProductList();
    expect(wrapper.findComponent(Search)).toBeDefined();
  });

  it('should call axios.get on component mount', async () => {
    await mountProductList();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/api/products');
  });

  it('should mount the ProductCard component 10 times', async () => {
    const { wrapper } = await mountProductList();

    const cards = wrapper.findAllComponents(ProductCard);

    expect(cards).toHaveLength(10);
  });

  it('should filter the product list when a search is performed', async () => {
    // Arrange
    const { wrapper } = await mountProductList(10, [
      {
        title: 'Meu relógio amado',
      },
      {
        title: 'Meu outro relógio estimado',
      },
    ]);

    // Act
    const search = wrapper.findComponent(Search);
    search.find('input[type="search"]').setValue('relógio');
    await search.find('form').trigger('submit');

    // Assert
    const cards = wrapper.findAllComponents(ProductCard);
    expect(wrapper.vm.searchTerm).toEqual('relógio');
    expect(cards).toHaveLength(2);
  });

  it('should filter the product list when a search is performed', async () => {
    // Arrange
    const { wrapper } = await mountProductList(10, [
      {
        title: 'Meu outro relógio estimado',
      },
    ]);

    // Act
    const search = wrapper.findComponent(Search);
    search.find('input[type="search"]').setValue('relógio');
    await search.find('form').trigger('submit');
    search.find('input[type="search"]').setValue('');
    await search.find('form').trigger('submit');

    // Assert
    const cards = wrapper.findAllComponents(ProductCard);
    expect(wrapper.vm.searchTerm).toEqual('');
    expect(cards).toHaveLength(11);
  });

  it('should display error message when promise rejects', async () => {
    const { wrapper } = await mountProductList(1, {}, true);

    expect(wrapper.text()).toContain('Problemas ao carregar a lista!');
  });

  it('should display the total quantity of products', async () => {
    const { wrapper } = await mountProductList(27);
    const label = wrapper.find('[data-testid="total-quantity-label"]');

    expect(label.text()).toEqual('27 Products');
  });

  it('should display product (singular) when there is only 1 product', async () => {
    const { wrapper } = await mountProductList(1);
    const label = wrapper.find('[data-testid="total-quantity-label"]');

    expect(label.text()).toEqual('1 Product');
  });
});
