const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const ContactServicePostgres = require('./services/ContactServicePostgres');

dotenv.config();

const contactService = new ContactServicePostgres();

(async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route([
    {
      method: 'GET',
      path: '/contacts',
      handler: () => contactService.getContacts(),
    },
  ]);

  await server.start();
  // eslint-disable-next-line no-console
  console.log('Server running on %s', server.info.uri);
})();
