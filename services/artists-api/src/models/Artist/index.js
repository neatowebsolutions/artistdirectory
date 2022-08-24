const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');

const { ASSETS_URL } = process.env;

let Artist = null;

const schemaOptions = {
  timestamps: true
};

const schema = new mongoose.Schema(
  {
    approvalStatus: {
      type: String,
      enum: ['approved', 'rejected', 'pending'],
      default: 'pending',
      required: true
    },
    reviewToken: { type: String, unique: true, required: true }, // TODO does it have to have unique option?
    editProfileToken: {
      type: String,
      required: false
    },
    rejectionReasons: [
      {
        type: String,
        function() {
          return this.approvalStatus === 'rejected';
        }
      }
    ],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: false },
    profileImageUrl: {
      type: String,
      required: false,
      default: `${ASSETS_URL}/default-images/default1_human_icon.png`
    },
    city: { type: String, required: true },
    social: [{ type: mongoose.Schema.Types.Mixed, required: false }],
    description: { type: String, required: true },
    categories: [{ type: String, required: true }],
    tags: [{ type: String, required: true }],
    skills: [{ type: String, required: true }],
    images: [{ type: String, required: true }],
    subscribedToNewsletter: { type: Boolean, required: true }
  },
  schemaOptions
);

schema.index({ editProfileToken: 1 }, { unique: true, sparse: true });

Artist = mongodbClient.connection.model('Artist', schema);

module.exports = Artist;
