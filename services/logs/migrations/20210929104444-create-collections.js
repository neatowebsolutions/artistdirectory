const models = require('../src/models');

module.exports = {
  async up() {
    const Log = await models.get('Log');

    await Log.createCollection();
  },

  async down() {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
