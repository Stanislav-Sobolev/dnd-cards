// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import { columnSchema } from './columnSchema';

export const boardSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please enter a board name'],
    },
    columnsData: [columnSchema],
  },
  {
    timestamps: true,
  },
);