const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const logger = require("@artistdirectory/logger");
const mongodbClient = require("../models/mongodbClient");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
//const models = require("../models");
//const {  AWS_UPLOADS_BUCKET } = process.env;
const s3 = new AWS.S3();

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodbClient.connect();

  if (event.source === "serverless-plugin-warmup") {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return "Lambda is warm!";
  }

  try {
    // Generate and return signed URL.
    // See https://trello.com/c/dl1YhHM0/56-refactor-uploading-to-upload-in-background-on-image-select#comment-6255922adccab9652b63ed48

    // TODO
    const name = `${uuidv4()}.${event.body.split("/")[1]}`;
    // console.log(data);
    const params = {
      //bucket: AWS_UPLOADS_BUCKET,
      Key: name, // TODO File name
      ContentType: event.body, // example // data.type  // MIME type based on file name (e.g., "image/jpeg" or "image/png") using "mime-types" NPM package OR via sending from the frontend.
    };

    const uploadURL = await s3.getSignedUrl("putObject", params);

   // console.log(uploadURL);

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(uploadURL), //  body: JSON.stringify(signedUrl),
    };
  } catch (error) {
    await logger.error(`Error generating profile upload signed URL`, error, {
      event,
    }); // Error text??

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
  }
};

module.exports.handler = handler;
