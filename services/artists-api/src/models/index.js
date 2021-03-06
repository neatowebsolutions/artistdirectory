const path = require('path');
const mongodbClient = require('./mongodbClient');

const modelCache = {};
const modelPathsMap = {
  Artist: path.join(__dirname, './Artist'),
  Category: path.join(__dirname, './Category'),
  Profile: path.join(__dirname, './Profile'),
  Skill: path.join(__dirname, './Skill'),
  Tag: path.join(__dirname, './Tag')
};

const get = async (modelName) => {
  // Return the cached model if the connection is established and the model has been loaded.
  if (mongodbClient.connected && modelCache[modelName]) {
    return modelCache[modelName];
  }

  // The connection must be established prior to models being loaded.
  if (!mongodbClient.connected) {
    await mongodbClient.connect();
  }

  // Load the model.
  if (!modelCache[modelName]) {
    modelCache[modelName] = require(modelPathsMap[modelName]); // eslint-disable-line import/no-dynamic-require
  }

  // Register the model schema.
  mongodbClient.connection.model(modelName, modelCache[modelName].schema);

  // Return the model.
  return modelCache[modelName];
};

const modelNames = Object.keys(modelPathsMap);

modelNames.forEach(async (modelName) => {
  await get(modelName);
});

module.exports = { get };
