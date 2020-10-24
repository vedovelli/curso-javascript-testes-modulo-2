import { createServer, Response } from 'miragejs';

if (process.env.NODE_ENV === 'development') {
  require('@/miragejs/server').makeServer();
}

if (window.Cypress) {
  // If your app makes requests to domains other than / (the current domain), add them
  // here so that they are also proxied from your app to the handleFromCypress function.
  // For example: let otherDomains = ["https://my-backend.herokuapp.com/"]
  const otherDomains = [];
  const methods = ['get', 'put', 'patch', 'post', 'delete'];

  createServer({
    environment: 'test',
    routes() {
      for (const domain of ['/', ...otherDomains]) {
        for (const method of methods) {
          this[method](`${domain}*`, async (schema, request) => {
            const [status, headers, body] = await window.handleFromCypress(
              request
            );
            return new Response(status, headers, body);
          });
        }
      }

      // If your central server has any calls to passthrough(), you'll need to duplicate them here
      // this.passthrough('https://analytics.google.com')
    },
  });
}
