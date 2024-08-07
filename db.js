import mongoose from "mongoose";
import env from 'dotenv';

env.config();

const url = process.env.DB_URL
mongoose.set('strictQuery', true);

mongoose.connect(url).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err);
});




