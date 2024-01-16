// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST: string | undefined = process.env.DB_HOST;

if (!HOST) {
  console.error('DB_HOST is not defined in the environment variables.');
  process.exit(1);
}

mongoose.set('strictQuery', false);
mongoose
  .connect(HOST)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
