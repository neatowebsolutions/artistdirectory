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
    const data = JSON.parse(event.body);
    const product = new Product(data);

    try {
      await product.validate();
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: ReasonPhrases.BAD_REQUEST
      };
    }

    await product.save();
    await logger.info(`Product created (${product.toString()})`, { data });

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(product)
    };
  } catch (error) {
    await logger.error(`Error creating product`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
