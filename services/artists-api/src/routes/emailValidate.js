const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
const mongodbClient = require('../models/mongodbClient');
const models = require('../models');

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodbClient.connect();

  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  try {
    const { email } = event.pathParameters;
    const Artist = await models.get('Artist');
    const artist = await Artist.findOne({ email });

    return {
      statusCode: StatusCodes.OK,
      body: artist
        ? JSON.stringify({ profile: true, account: Boolean(artist.password) })
        : JSON.stringify({ profile: false, account: false })
    };
  } catch (error) {
    await logger.error(`Error retrieving artist`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
