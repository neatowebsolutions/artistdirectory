const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenvExpand(dotenv.config());

const { MONGODB_URL_DIRECTORY } = process.env;

const config = {
  mongodb: {
    url: MONGODB_URL_DIRECTORY,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 60 * 1000 * 5,
      keepAlive: true
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.js'
};

// Return the config as a promise
module.exports = config;
