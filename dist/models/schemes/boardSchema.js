"use strict";
var mongoose = require('mongoose');
var columnSchema = require('./columnSchema');
var boardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please enter a board name'],
    },
    columnsData: [columnSchema],
}, {
    timestamps: true,
});
module.exports = boardSchema;
//# sourceMappingURL=boardSchema.js.map