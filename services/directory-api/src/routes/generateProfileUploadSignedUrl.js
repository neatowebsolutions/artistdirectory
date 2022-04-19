const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const {
  StatusCodes,
  ReasonPhrases,
  getReasonPhrase
} = require('http-status-codes');
const { aws4Interceptor } = require('aws4-axios');
const HttpClient = require('@artistdirectory/http-client').default;

const s3 = new AWS.S3();

const { AWS_REGION, ARTISTS_API_URL, AWS_UPLOADS_BUCKET } = process.env;
console.log(process.env);
console.log('===========================');

console.log(AWS_UPLOADS_BUCKET);
console.log('===========================');
console.log(ARTISTS_API_URL);
console.log('===========================');
console.log('===========================');
const httpClient = new HttpClient({
  baseUrl: ARTISTS_API_URL
});

httpClient.addRequestInterceptor(
  aws4Interceptor({
    region: AWS_REGION,
    service: 'execute-api'
  })
);

const handler = middy(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  try {
    // TODO

    const name = `${uuidv4()}.${event.body.split('/')[1]}`;
    console.log(event.body);
    // console.log(process.env)
    const params = {
      Bucket: 'artistdirectory-uploads-test', // AWS_UPLOADS_BUCKET,
      Key: name, // File name
      ContentType: event.body // example // data.type  // MIME type based on file name (e.g., "image/jpeg" or "image/png") using "mime-types" NPM package OR via sending from the frontend.
    };

    // const uploadURL =
    // await s3.getSignedUrl("putObject", params, (err, data) => {
    //   if (err) {
    //     console.log("IS THERE AN ERRROROR===========")
    //     console.log(err);
    //   } else {
    //     console.log(data);

    //     return {
    //       statusCode: StatusCodes.CREATED,
    //       body: JSON.stringify("OOOOOOOO"), //JSON.stringify(uploadURL),
    //     };
    //   }
    // });

    const uploadURL = await new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', params, (error, url) => {
        if (error) {
          reject(error);
        }
        resolve(url);
      });
    });

    // do stuff with url

    console.log(uploadURL);

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(uploadURL) // JSON.stringify(uploadURL),
    };
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status) {
      return {
        statusCode: error.response.status,
        body:
          JSON.stringify(error.response.data) ||
          getReasonPhrase(error.response.status)
      };
    }

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
});

handler.use(cors());

module.exports.handler = handler;
