const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');

let Artist = null;

const schemaOptions = {
  timestamps: true
};
const schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    social: { type: mongoose.Schema.Types.Mixed, required: true },
    artistType: { type: mongoose.Schema.Types.Mixed, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    keywords: [{ type: String, required: true }],
    hireableSkills: [{ type: String, required: true }],
    subscribedToNewsletter: { type: Boolean, required: true }
  },
  schemaOptions
);

Artist = mongodbClient.connection.model('Artist', schema);

module.exports = Artist;
