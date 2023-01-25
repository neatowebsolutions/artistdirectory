const jwt = require('jsonwebtoken');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('@artistdirectory/logger');
//const nextAuthJWT = require('next-auth/jwt');
const { JWT_SECRET, NEXTAUTH_SECRET } = process.env;

// Reference: https://github.com/tmaximini/serverless-jwt-authorizer/blob/master/functions/authorize.js

const generatePolicyDocument = (effect, methodArn) => {
  if (!effect || !methodArn) {
    return null;
  }

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: methodArn
      }
    ]
  };

  return policyDocument;
};

const generateAuthResponse = (principalId, effect, methodArn) => {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  return {
    principalId,
    policyDocument
  };
};

const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log('++++++++========AUTHORIZER============++++++++++');
  console.log(event.headers.Cookie);
  // const tokenTest = await nextStuff.getToken({
  //   req: event,
  //   secret: process.env.NEXTAUTH_SECRET,
  //   raw: true
  // });

  console.log('++++++++========AUTHORIZER============++++++++++');
  if (event.source === 'serverless-plugin-warmup') {
    await new Promise((resolve) => setTimeout(resolve, 25));
    return 'Lambda is warm!';
  }

  const authorizationHeader =
    event.headers.Authorization || event.headers.authorization;
  const token =
    authorizationHeader && authorizationHeader.replace('Bearer ', '');
  const { methodArn } = event;

  if (!token || !methodArn) {
    await logger.warn('Unauthorized access attempt', null, { event });

    return {
      statusCode: StatusCodes.UNAUTHORIZED,
      body: ReasonPhrases.UNAUTHORIZED
    };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('=======DECODED=======');
    console.log(decoded);
    if (decoded) {
      return {
        ...generateAuthResponse(decoded.userId, 'Allow', methodArn),
        context: {
          userId: decoded.userId
        }
      };
    } else {
      throw new Error('Cannot decode JWT');
    }
  } catch (error) {
    await logger.warn('Invalid access attempt', null, { event });

    return generateAuthResponse('user', 'Deny', methodArn);
  }
};

module.exports.handler = handler;
