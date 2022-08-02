const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
const AWS = require('aws-sdk');
const slugify = require('slugify');
const emailClient = require('@artistdirectory/email-client');
const mongodbClient = require('../models/mongodbClient');
const models = require('../models');

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  UPLOADS_BUCKET,
  ASSETS_BUCKET,
  ADMIN_EMAIL,
} = process.env;

// TODO - what is the url and where it comes from ENV?
const baseUrl = 'https://assets.artistdirectory.co';

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

const getKeywords = (model, keywords) => {
  const promises = keywords.map(async (keyword) => {
    const lowerCaseKeyword = keyword.toLowerCase();
    const existing = await model.findOne({ name: lowerCaseKeyword });
    if (!existing) {
      const newKeyword = await model.create({
        name: lowerCaseKeyword,
        slug: slugify(lowerCaseKeyword),
      });
      return newKeyword.name;
    }
    return existing.name;
  });
  return Promise.all(promises);
};

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodbClient.connect();

  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  try {
    const data = JSON.parse(event.body);
    const { skills, tags, categories, social, images } = data;

    const Skill = await models.get('Skill');
    const Tag = await models.get('Tag');
    const Category = await models.get('Category');

    const socialParsed = social
      .map((item) => {
        delete item.checked;
        return item;
      })
      .filter((item) => item.url);

    const imageUrls = images.map((image) => `${baseUrl}/profile/${image}`); // TODO - correct the URL
    const getSkills = await getKeywords(Skill, skills);
    const getTags = await getKeywords(Tag, tags);
    const getCategories = await getKeywords(Category, categories);

    const [skillsParsed, tagsParsed, categoriesParsed] = await Promise.all([
      getSkills,
      getTags,
      getCategories,
    ]);

    console.log('============artist api============');

    const dataParsed = {
      ...data,
      images: imageUrls,
      social: socialParsed,
      skills: skillsParsed,
      tags: tagsParsed,
      categories: categoriesParsed,
    };

    const Artist = await models.get('Artist');
    const artist = new Artist(dataParsed);

    try {
      await artist.validate();
      await emailClient.enqueue({
        to: ADMIN_EMAIL,
        from: 'noreply@artistdirectory.com',
        subject: 'New artist profile ready for review',
        body: 'TODO',
      });
    } catch (error) {
      console.log(error);
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: ReasonPhrases.BAD_REQUEST,
      };
    }

    await artist.save();
    await logger.info(`Artist created (${artist.toString()})`, { data });

    // copy images from uploads_bucket to assets_bucket
    try {
      const copyImages = (imagesArray) => {
        const copiedImages = imagesArray.map(async (image) => {
          const params = {
            Bucket: ASSETS_BUCKET,
            CopySource: encodeURI(`${UPLOADS_BUCKET}/profile/${image}`),
            Key: `profile/${image}`,
          };

          return await s3.copyObject(params).promise(); // docs - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#copyObject-property
        });
        return Promise.all(copiedImages);
      };

      await copyImages(data.images);
    } catch (error) {
      console.log(
        '=================================error coping to the other bucket=========='
      );
      console.log(error);
      // TODO - ?? should we return a server error here  - return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,  };*/
    }

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(artist),
    };
  } catch (error) {
    console.log('=========ERROR CREATING ARTIST=============');
    await logger.error(`Error creating artist`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    };
  }
};

module.exports.handler = handler;
