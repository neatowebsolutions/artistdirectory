const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const {
  StatusCodes,
  ReasonPhrases,
  getReasonPhrase
} = require('http-status-codes');
const HttpClient = require('@artistdirectory/gateway-http-client');

const { ARTISTS_API_URL } = process.env;

const httpClient = new HttpClient({
  baseUrl: ARTISTS_API_URL
});

const handler = middy(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  try {
    const data = JSON.parse(event.body);
    // TODO - check if valid password and email??? WILL be checked in the mongoose model
    const artistData = await httpClient.post(`/accounts`, data); // TODO change route name for something  like /auth/accounts or /auth/signin

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(artistData)
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
