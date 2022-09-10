import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => {
      console.log('mongo connect to collection youtube');
    })
    .catch((err) => {
      throw err;
    });
};

app.listen(8800, () => {
  connect();
  console.log('connect');
});
