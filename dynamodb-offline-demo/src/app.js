const dotenv = require('dotenv');
const Hapi = require('@hapi/hapi');
const ContactsServiceDynamoDB = require('./services/ContactsServiceDynamoDB');

dotenv.config();

const contactService = new ContactsServiceDynamoDB();

(async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route([
    {
      method: 'GET',
      path: '/contacts',
      handler: async () => contactService.getAll(),
    },
    {
      method: 'POST',
      path: '/contacts',
      handler: async (request, h) => {
        const {
          id = `contact-${Date.now()}`, firstName, lastName, email, phone,
        } = request.payload;

        await contactService.persist({
          id,
          firstName,
          lastName,
          email,
          phone,
        });

        const response = h.response({
          status: 'success',
          message: 'Contact created',
        });
        response.code(201);
        return response;
      },
    },
    {
      method: 'DELETE',
      path: '/contacts/{id}',
      handler: async (request) => {
        const { id } = request.params;
        await contactService.delete(id);

        return {
          status: 'success',
          message: 'Contact deleted',
        };
      },
    },
  ]);

  await server.start();
  // eslint-disable-next-line no-console
  console.log('Server running on %s', server.info.uri);
})();
