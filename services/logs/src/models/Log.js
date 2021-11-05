const mongoose = require('mongoose');
const mongodbClient = require('./mongodbClient');

let Log = null;

const schema = new mongoose.Schema({
  source: { type: String, required: true, trim: true },
  type: {
    type: String,
    required: true,
    enum: ['INFO', 'WARN', 'ERROR']
  },
  message: { type: String, required: true, trim: true },
  stackTrace: { type: String, required: false, trim: true },
  data: { type: mongoose.Schema.Types.Mixed, required: false },
  createdAt: { type: Date, required: true, default: Date.now }
});

Log = mongodbClient.connection.model('Log', schema);

module.exports = Log;
