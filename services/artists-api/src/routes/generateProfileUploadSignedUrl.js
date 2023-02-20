const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const { UPLOADS_BUCKET } = process.env;

const s3 = new AWS.S3();

const handler = async (event) => {
  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  try {
    const { mimeType } = JSON.parse(event.body);
    const fileName = `${uuidv4()}.${mimeType.split('/')[1]}`; // TODO Improve how we get file extension
    const params = {
      Bucket: UPLOADS_BUCKET,
      Key: `profile/${fileName}`,
      ContentType: mimeType
    };

    // Generate and return signed URL. See https://trello.com/c/dl1YhHM0/56-refactor-uploading-to-upload-in-background-on-image-select#comment-6255922adccab9652b63ed48
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify({ signedUrl, fileName }) //  body: JSON.stringify(signedUrl),
    };
  } catch (error) {
    await logger.error(`Error generating profile upload signed URL`, error, {
      event
    }); // Error text??

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
