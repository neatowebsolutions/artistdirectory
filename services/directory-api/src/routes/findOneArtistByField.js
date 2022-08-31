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
    const { field, value } = event.pathParameters;

    const fieldMap = {
      'review-token': 'reviewToken',
      'edit-profile-token': 'editProfileToken'
    };
    const mappedField = fieldMap[field];
    
    if (!mappedField) {
      throw new Error(`Invalid field ${field}`);
    }

    const artist = await httpClient.get(`/artists/${mappedField}/${value}`);

    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify(artist)
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
