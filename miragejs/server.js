import { Server } from 'miragejs';
import products from '@/mocks/products.json';

export const makeServer = ({ environment = 'development' } = {}) => {
  return new Server({
    environment,
    routes() {
      this.namespace = 'api';
      this.get('products', () => ({
        products,
      }));
    },
  });
};
