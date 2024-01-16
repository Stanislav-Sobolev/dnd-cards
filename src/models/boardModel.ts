
// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import { boardSchema } from './schemes/boardSchema';

export const Board = mongoose.model('Board', boardSchema);
