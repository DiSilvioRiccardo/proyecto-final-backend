const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    comments: { type: [String], default: [] },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("delivery", deliverySchema);