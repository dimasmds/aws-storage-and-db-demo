const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv');
const S3StorageService = require('./services/S3StorageService');

dotenv.config();

(async () => {
  const storageService = new S3StorageService();

  const server = Hapi.server({
    host: 'localhost',
    port: 3000,
    debug: {
      request: ['error'],
    },
  });

  server.route([
    {
      method: 'POST',
      path: '/uploads',
      handler: async (request) => {
        const { image } = request.payload;

        const fileLocation = await storageService.uploadObject(image, image.hapi);

        return {
          fileLocation,
        };
      },
      options: {
        payload: {
          allow: 'multipart/form-data',
          multipart: true,
          output: 'stream',
        },
      },
    },
    {
      method: 'PUT',
      path: '/pre-signed-url/{fileName}',
      handler: async (request) => {
        const { fileName } = request.params;

        const putUrl = await storageService.putSignedUrl(fileName);

        return {
          putUrl,
        };
      },
    },
    {
      method: 'GET',
      path: '/pre-signed-url/{fileName}',
      handler: async (request) => {
        const { fileName } = request.params;

        const getUrl = await storageService.getSignedUrl(fileName);

        return {
          getUrl,
        };
      },
    },
  ]);

  await server.start();
  // eslint-disable-next-line no-console
  console.log('Server running on %s', server.info.uri);
})();
