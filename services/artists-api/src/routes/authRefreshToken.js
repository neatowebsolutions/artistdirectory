const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
const jwt = require('jsonwebtoken');
const mongodbClient = require('../models/mongodbClient');
const models = require('../models');
const { JWT_SECRET, REFRESH_JWT_SECRET } = process.env;

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodbClient.connect();

  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }
  console.log('=======ARTIST API===========');

  try {
    const { token } = JSON.parse(event.body);

    try {
      // TODO - do we need to store the token in DB and then check if it exists along with decoding?
      const decoded = jwt.verify(token, REFRESH_JWT_SECRET);

      if (decoded) {
        console.log(decoded);
        // return new accessToken
        const accessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
          expiresIn: '10m'
        });
        const accessTokenExpiry = new Date().getTime() + 10 * 60 * 1000; // TODO - change to longer token, like 15 mins or more

        // TODO - what to return here
        await logger.info(
          `New access token issued (${accessToken.toString()})`,
          {
            data: accessToken
          }
        );
        console.log({
          accessToken,
          accessTokenExpiry
        });
        return {
          statusCode: StatusCodes.CREATED, // TODO - is it correct status code?
          body: JSON.stringify({
            accessToken,
            accessTokenExpiry
          })
        };
      } else {
        throw new Error('Cannot decode JWT');
      }
    } catch (error) {
      await logger.warn('Invalid access attempt', null, { event });

      return {
        statusCode: StatusCodes.UNAUTHORIZED,
        body: ReasonPhrases.UNAUTHORIZED
      };
    }
  } catch (error) {
    await logger.error(`Error login artist`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
