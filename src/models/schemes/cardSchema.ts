// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

export const cardSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Please enter an item name'],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);