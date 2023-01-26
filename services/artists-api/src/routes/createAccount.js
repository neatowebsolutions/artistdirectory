const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
const jwt = require('jsonwebtoken');
const mongodbClient = require('../models/mongodbClient');
const models = require('../models');
const { JWT_SECRET } = process.env;

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
    const { email, password, isNew } = data;

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

    if (isNew === 'false' && artist.password) {
      const isValidPassword = await artist.validPassword(password);
      if (!isValidPassword) {
        return {
          statusCode: StatusCodes.UNAUTHORIZED,
          body: ReasonPhrases.UNAUTHORIZED
        };
      }
    } else if (isNew === 'true') {
      await artist.setPassword(password);
    } else {
      // TODO - provide right feedback if artist did not go through account creating stage on the front end
      return {
        statusCode: StatusCodes.UNAUTHORIZED,
        body: ReasonPhrases.UNAUTHORIZED
      };
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

    const { _id: userId, firstName, lastName, profileImageUrl } = artist;
    const accessToken = jwt.sign(
      { userId, firstName, lastName, profileImageUrl },
      JWT_SECRET
    );

    await logger.info(
      `Account created/artist signed in (${artist.toString()})`,
      {
        data
      }
    );

    return {
      statusCode: StatusCodes.CREATED, // TODO - is it correct status code?
      body: JSON.stringify({
        accessToken
      })
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
