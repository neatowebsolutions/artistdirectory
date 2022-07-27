const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
const emailClient = require('@artistdirectory/email-client');
const mongodbClient = require('../models/mongodbClient');
const models = require('../models');

const { ADMIN_EMAIL } = process.env;

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodbClient.connect();

  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  try {
    const Artist = await models.get('Artist');
    const data = JSON.parse(event.body);
    const artist = new Artist(data);

    try {
      await artist.validate();
      await emailClient.enqueue({
        to: ADMIN_EMAIL,
        from: 'noreply@artistdirectory.com',
        subject: 'New artist profile ready for review',
        body: 'TODO'
      });
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: ReasonPhrases.BAD_REQUEST
      };
    }

    await artist.save();
    await logger.info(`Artist created (${artist.toString()})`, { data });

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(artist)
    };
  } catch (error) {
    await logger.error(`Error creating artist`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
