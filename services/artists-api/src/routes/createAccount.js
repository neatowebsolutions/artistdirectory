const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
const generateToken = require('./../utilities/generateToken');
const parseKeywords = require('./../utilities/parseKeywords');
const emailAdminToReviewArtist = require('./../utilities/emailAdminToReviewArtist');
const copyImagesToAssetsBucket = require('./../utilities/copyImagesToAssetsBucket');
const mongodbClient = require('../models/mongodbClient');
const models = require('../models');

const { ASSETS_URL } = process.env;

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodbClient.connect();

  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  try {
    const data = JSON.parse(event.body);
    const { email, password } = data;

    const Artist = await models.get('Artist');
    const artist = await Artist.findOne({ email });
    console.log('=============ARTIST-API===================');
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

    console.log(artist);
    await logger.info(`Account created/artist updated (${artist.toString()})`, {
      data
    });

    return {
      statusCode: StatusCodes.CREATED,
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
