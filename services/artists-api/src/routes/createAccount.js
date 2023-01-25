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
  console.log('=======ARTIST API===========');

  try {
    const data = JSON.parse(event.body);
    const { email, password } = data;

    const Artist = await models.get('Artist');
    const artist = await Artist.findOne({ email });

    //TODO - should we reject account creating for profiles which are pending or rejected??
    // TODO - server side password and email validation??
    //console.log(artist);
    if (!artist) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: ReasonPhrases.NOT_FOUND
      };
    }

    if (artist && artist.password) {
      const isValidPassword = await artist.validPassword(password);
      if (!isValidPassword) {
        return {
          statusCode: StatusCodes.UNAUTHORIZED,
          body: ReasonPhrases.UNAUTHORIZED
        };
      }
    } else {
      await artist.setPassword(password);
    }

    try {
      await artist.validate();
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: ReasonPhrases.BAD_REQUEST
      };
    }

    await artist.save();

    await logger.info(
      `Account created/artist signed in (${artist.toString()})`,
      {
        data
      }
    );

    return {
      statusCode: StatusCodes.CREATED, // TODO - is it correct status code?
      body: JSON.stringify(artist)
    };
  } catch (error) {
    await logger.error(`Error login artist`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
