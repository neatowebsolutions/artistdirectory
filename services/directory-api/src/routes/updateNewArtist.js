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
    const { editProfileToken } = event.pathParameters;
    const data = JSON.parse(event.body);

    const updatedArtist = await httpClient.patch(
      `/artists/edit/edit-profile-token/${editProfileToken}`,
      data
    );

    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify(updatedArtist) // TODO what do we return
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
