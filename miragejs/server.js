import { Server } from 'miragejs';
import factories from './factories';
import routes from './routes';
import models from './models';
import seeds from './seeds';

const config = (environment) => {
  const config = {
    environment,
    factories,
    models,
    routes,
    seeds,
  };

  config.urlPrefix = 'http://localhost:5000';

  return config;
};

export function makeServer({ environment = 'development' } = {}) {
  return new Server(config(environment));
}
