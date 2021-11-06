const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const {
  StatusCodes,
  ReasonPhrases,
  getReasonPhrase
} = require('http-status-codes');
const { aws4Interceptor } = require('aws4-axios');
const HttpClient = require('@artistdirectory/http-client').default;
const logger = require('@artistdirectory/logger');

const { AWS_REGION, DIRECTORY_API_URL } = process.env;

const httpClient = new HttpClient({
  baseUrl: DIRECTORY_API_URL
});

httpClient.addRequestInterceptor(
  aws4Interceptor({
    region: AWS_REGION,
    service: 'execute-api'
  })
);

const handler = middy(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  try {
    const { userId } = event.requestContext.authorizer;
    const { productId } = event.pathParameters;
    const product = await httpClient.get(`/products/${productId}`);
    const productUserId = product && product.user;

    if (userId !== productUserId) {
      await logger.warn(
        `Unauthorized access attempt for product ${productId}`,
        null,
        { event }
      );

      return {
        statusCode: StatusCodes.FORBIDDEN,
        body: ReasonPhrases.FORBIDDEN
      };
    }

    await httpClient.delete(`/products/${productId}`);

    return {
      statusCode: StatusCodes.NO_CONTENT
    };
  } catch (error) {
    if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        body:
          JSON.stringify(error.response.data) ||
          getReasonPhrase(error.response.status)
      };
    }

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
});

handler.use(cors());

module.exports.handler = handler;
