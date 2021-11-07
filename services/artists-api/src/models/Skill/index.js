const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');

let Skill = null;

const schemaOptions = {
  timestamps: true
};
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true }
  },
  schemaOptions
);

Skill = mongodbClient.connection.model('Skill', schema);

module.exports = Skill;
