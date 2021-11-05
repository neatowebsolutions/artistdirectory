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
    const { productId } = event.pathParameters;
    const Product = await models.get('Product');
    const product = await Product.findById(productId);
    const data = JSON.parse(event.body);

    if (!product) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: ReasonPhrases.NOT_FOUND
      };
    }

    delete data.__v;

    try {
      await product.replaceOne({
        ...data

        // Fields managed only by this API.
        // TODO
      });
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: ReasonPhrases.BAD_REQUEST
      };
    }

    await product.save();
    await logger.info(`Product updated (${product.toString()})`, { data });

    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify(product)
    };
  } catch (error) {
    await logger.error(`Error updating product`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
