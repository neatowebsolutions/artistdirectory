const models = require('../src/models');

module.exports = {
  async up() {
    const Artist = await models.get('Artist');
    const Category = await models.get('Category');
    const Profile = await models.get('Profile');
    const Skill = await models.get('Skill');
    const Tag = await models.get('Tag');

    await Artist.createCollection();
    await Category.createCollection();
    await Profile.createCollection();
    await Skill.createCollection();
    await Tag.createCollection();
  },

  async down() {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
