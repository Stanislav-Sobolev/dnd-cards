
var mongoose = require('mongoose');
var cardSchema = require('./cardSchema');

var columnSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please enter a column title'],
    },
    items: [cardSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = columnSchema;