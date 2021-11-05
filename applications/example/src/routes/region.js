const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const { StatusCodes } = require('http-status-codes');

const { AWS_REGION } = process.env;

const handler = middy(async () => ({
  statusCode: StatusCodes.OK,
  body: AWS_REGION
}));

handler.use(cors());

module.exports.handler = handler;
