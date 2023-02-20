// TODO - should we do server side user  data validation validation??

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
const generateToken = require('./../utilities/generateToken');
const parseKeywords = require('./../utilities/parseKeywords');
const emailAdminToReviewArtist = require('./../utilities/emailAdminToReviewArtist');
const copyImagesToAssetsBucket = require('./../utilities/copyImagesToAssetsBucket');
const mongodbClient = require('../models/mongodbClient');
const models = require('../models');

const { ASSETS_URL } = process.env;

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
    const [skillsParsed, tagsParsed, categoriesParsed] = await parseKeywords(
      skills,
      tags,
      categories
    );

    const imageUrls = images.map((image) => `${ASSETS_URL}/profile/${image}`);

    const reviewToken = await generateToken();

    const dataParsed = {
      ...data,
      images: imageUrls,
      social,
      skills: skillsParsed,
      tags: tagsParsed,
      categories: categoriesParsed,
      reviewToken
    };

    const Artist = await models.get('Artist');
    const artist = new Artist(dataParsed);

    try {
      await artist.validate();

      // send email to admin to initiate artist profile review
      await emailAdminToReviewArtist(reviewToken);
    } catch (error) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: ReasonPhrases.BAD_REQUEST
      };
    }

    await artist.save();
    await logger.info(`Artist created (${artist.toString()})`, { data });

    // copy images from uploads_bucket to assets_bucket
    await copyImagesToAssetsBucket(data.images);

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(artist)
    };
  } catch (error) {
    await logger.error(`Error creating artist`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
