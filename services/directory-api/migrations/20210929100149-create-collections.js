const models = require('../src/models');

module.exports = {
  async up() {
    const Product = await models.get('Product');

    await Product.createCollection();
  },

  async down() {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
