const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const handler = middy(async () => ({
  statusCode: StatusCodes.OK,
  body: ReasonPhrases.OK
}));

handler.use(cors());

module.exports.handler = handler;
