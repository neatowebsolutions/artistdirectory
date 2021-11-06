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
    const { productId } = event.pathParameters;
    const Product = await models.get('Product');
    const product = await Product.findById(productId);

    if (!product) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: ReasonPhrases.NOT_FOUND
      };
    }

    // Delete the product.
    await Product.findByIdAndDelete(productId);

    await logger.info(`Product deleted (${product.toString()})`, { product });

    return {
      statusCode: StatusCodes.NO_CONTENT
    };
  } catch (error) {
    await logger.error(`Error deleting product`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
