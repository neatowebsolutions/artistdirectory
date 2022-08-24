const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
const generateToken = require('./../utilities/generateToken');
const emailClient = require('@artistdirectory/email-client');
const mongodbClient = require('../models/mongodbClient');
const models = require('../models');

const { DIRECTORY_API_URL } = process.env;

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await mongodbClient.connect();

  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  try {
    const { reviewToken } = event.pathParameters;
    const Artist = await models.get('Artist');
    const { approvalStatus, rejectionReason } = JSON.parse(event.body);

    // generate token for url for editing artist profile if rejected
    const editProfileToken = await generateToken();
    const artist = await Artist.findOneAndUpdate(
      { reviewToken },
      [
        {
          $set: {
            approvalStatus,
            editProfileToken: {
              $cond: {
                if: approvalStatus === 'rejected',
                then: editProfileToken,
                else: null
              }
            }
          }
        }
      ],
      {
        new: true
      }
    );
    if (approvalStatus === 'rejected') {
      artist.rejectionReasons.push(rejectionReason);
    }

    if (!artist) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: ReasonPhrases.NOT_FOUND
      };
    }

    const { firstName, lastName, email } = artist;

    // send email to the artist about profile review decision
    await emailClient.enqueue({
      to: email,
      from: 'noreply@artistdirectory.com', // TODO admin's email or noreply?
      subject: 'Your artist profile has been reviewed',
      body:
        approvalStatus === 'approved'
          ? `
          <html>
            <body>
                <div style="text-align: center;">
                  <h1>Hello!</h1>
                  <p style="font-weight: 600">We have reviewed your profile.</p>
                  <p> Congratulations! Your profile has been approved and is now live on our website.Follow this link to see your profile - <a href="${DIRECTORY_API_URL}/artists/${artist._id}">${firstName} ${lastName}'s artist profile</a>!</p> 
                  <p>While you are at it, follow this link to create an account for easy managing your artist profile <a href="${DIRECTORY_API_URL}/create-account/">Create your account</a></p>
                  <p style="font-weight: 700">Thank you!</p>
                </div>
            </body>
          </html>`
          : `
          <html>
          <body>
              <div style="text-align: center;">
                <h1>Hello!</h1>
                <p style="font-weight: 600">We have reviewed your profile.</p>
                <p>Unfortunately your artist profile does not comply with our policies. 
                We had to reject your profile creating request for the following reasons: 
                ${rejectionReason}.
                Follow this link to edit your profile - <a href="${DIRECTORY_API_URL}/reviews/${editProfileToken}/edit">${firstName} ${lastName}'s artist profile</a>!</p>
                <p style="font-weight: 700">Thank you!</p>
              </div>
          </body>
        </html>
  `
    });

    await artist.save();
    await logger.info(`Artist profile status updated (${artist.toString()})`, {
      approvalStatus
    });

    return {
      statusCode: StatusCodes.OK,
      body: JSON.stringify(artist)
    };
  } catch (error) {
    await logger.error(`Error retrieving artist`, error, { event });

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    };
  }
};

module.exports.handler = handler;
