
// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import { cardSchema } from './cardSchema';

export const columnSchema = new mongoose.Schema(
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