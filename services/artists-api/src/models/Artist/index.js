const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');
const rejectProfile = require('./rejectProfile');
const approveProfile = require('./approveProfile');
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
    reviewToken: {
      type: String,
      required() {
        return this.approvalStatus === 'pending';
      }
    },
    editProfileToken: {
      type: String,
      required() {
        return this.approvalStatus === 'rejected';
      }
    },
    rejectionReasons: [
      {
        type: String,
        required() {
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

schema.methods.approveProfile = function () {
  return approveProfile(this);
};

schema.methods.rejectProfile = function (rejectionReason) {
  return rejectProfile(this, rejectionReason);
};

// create indexes
schema.index({ editProfileToken: 1 }, { unique: true, sparse: true });
schema.index({ reviewToken: 1 }, { unique: true, sparse: true });

Artist = mongodbClient.connection.model('Artist', schema);

module.exports = Artist;
