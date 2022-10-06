const AWS = require('aws-sdk');

const { UPLOADS_BUCKET, ASSETS_BUCKET } = process.env;

const s3 = new AWS.S3();

const copyImagesToAssetsBucket = (imagesArray) => {
  // copy images from uploads_bucket to assets_bucket
  const copiedImages = imagesArray.map(async (image) => {
    const params = {
      Bucket: ASSETS_BUCKET,
      CopySource: encodeURI(`${UPLOADS_BUCKET}/profile/${image}`),
      Key: `profile/${image}`
    };

    return await s3.copyObject(params).promise(); // docs - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#copyObject-property
  });
  return Promise.all(copiedImages);
};

module.exports = copyImagesToAssetsBucket;
