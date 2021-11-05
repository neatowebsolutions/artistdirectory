const getenv = require('getenv');
const serverless = require('serverless-http');
const Koa = require('koa');
const next = require('next');

const { NODE_ENV } = process.env;
const dev = NODE_ENV !== 'production';
const port = getenv.int('EXAMPLE_APP_PORT', 3001);
const app = next({ dev });

const createServer = () => {
  const server = new Koa();
  const handle = app.getRequestHandler();

  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.on('error', (error) => {
    console.error(error); // eslint-disable-line no-console
  });

  return server;
};

if (dev) {
  app.prepare().then(() => {
    createServer().listen(port, () => {
      console.info(`Example app running at http://localhost:${port}`); // eslint-disable-line no-console
    });
  });
}

module.exports.handler = async (event, context) => {
  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  const serverlessHandler = serverless(createServer());

  return serverlessHandler(event, context);
};
