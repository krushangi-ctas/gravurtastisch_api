const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const supportRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

supportRequestSchema.plugin(toJSON);
supportRequestSchema.plugin(paginate);

const SupportRequestModel = mongoose.model(
  'tbl_support_requests',
  supportRequestSchema
);

module.exports = SupportRequestModel;
