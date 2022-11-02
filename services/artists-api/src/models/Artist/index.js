const mongoose = require('mongoose');
const crypto = require('crypto');
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
    salt: { type: String, required: false },
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

// Method to set salt and hash the password for a user setPassword method first creates a salt unique for every user then it hashes the salt with user password and creates a hash this hash is stored in the database as user password
schema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString('hex');

  // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return this;
};

// Method to check the entered password is correct or not valid password method checks whether the user password is correct or not It takes the user password from the request and salt from user database entry It then hashes user password and salt then checks if this generated hash is equal to user's hash in the database or not If the user's hash is equal to generated hash then the password is correct otherwise not
schema.methods.validPassword = function (password) {
  const validatePassword = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.password === validatePassword;
};

// create indexes
schema.index({ editProfileToken: 1 }, { unique: true, sparse: true });
schema.index({ reviewToken: 1 }, { unique: true, sparse: true });

Artist = mongodbClient.connection.model('Artist', schema);

module.exports = Artist;
