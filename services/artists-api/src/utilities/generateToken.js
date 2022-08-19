const { randomBytes } = require('crypto');
const { promisify } = require('util');

const generateToken = async () => {
  // use node promisify function to return a promise using randomBytes function
  const randomBytesPromisified = promisify(randomBytes);
  // generate token
  const token = (await randomBytesPromisified(20)).toString('hex');

  return token;
};

module.exports = generateToken;
