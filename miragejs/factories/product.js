/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */
import { Factory } from 'miragejs';

/*
 * Faker Github repository: https://github.com/Marak/Faker.js#readme
 */
import faker from 'faker';

export default {
  product: Factory.extend({
    title() {
      return faker.fake('{{lorem.words}}');
    },
    price() {
      return faker.fake('{{commerce.price}}');
    },
  }),
};
