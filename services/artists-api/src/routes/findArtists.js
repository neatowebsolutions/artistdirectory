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
    const Artist = await models.get('Artist');
    const artists = await Artist.find({});
   
    // await Promise.all(
    //   artists.map(async (artist) => {
    //     await artist
    //       .populate('categories')
    //       .populate('tags')
    //       .populate('skills')
    //       .execPopulate();
    //   })
    // );

    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify(artists),
    };
  } catch (error) {
    await logger.error(`Error retrieving artists`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
  }
};

module.exports.handler = handler;
