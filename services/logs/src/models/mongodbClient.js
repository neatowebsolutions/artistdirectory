const Promise = require('bluebird');
const mongoose = require('mongoose');
const MongodbClientLambda = require('@chaddjohnson/mongodb-client-lambda');

const { MONGODB_URL_LOGS } = process.env;

const connectionUri = MONGODB_URL_LOGS;
const connectionOptions = {
  useUnifiedTopology: true,

  // The maximum number of sockets the MongoDB driver will keep open for this connection.
  poolSize: 10,

  // How long the MongoDB driver will wait before killing a socket due to inactivity after initial connection.
  socketTimeoutMS: 2000000,

  // Keep the connection alive.
  keepAlive: true,

  // Opt in to using the MongoDB driver's findOneAndUpdate() function.
  // See https://mongoosejs.com/docs/deprecations.html#findandmodify.
  useFindAndModify: false,

  // Use IPv4, and skip trying IPv6.
  family: 4
};

const mongodbClient = new MongodbClientLambda(connectionUri, connectionOptions);

// Use Bluebird for promises.
mongoose.Promise = Promise;

// Set serialization options.
mongoose.set('toObject', { depopulate: true });
mongoose.set('toJSON', { depopulate: true });

module.exports = mongodbClient;
