const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@template/logger');
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
    const Product = await models.get('Product');
    const products = await Product.find({});

    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify(products)
    };
  } catch (error) {
    await logger.error(`Error retrieving products`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
