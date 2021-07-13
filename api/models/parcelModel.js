const mongoose = require("mongoose");

// Setup Schema
const parcelSchema = mongoose.Schema({
  orderDate: {
    type: Date,
    required: true,
  },
  shipDate: {
    type: Date,
  },
  user: {
      type: String
  },
  trackingNo: {
    type: String,
  },
  location: {
    type: String,
  },
  destination: {
    type: String,
  },
  cost: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  status: {
    type: String,
  },
});

const Parcel = (module.exports = mongoose.model("parcel", parcelSchema));