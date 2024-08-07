import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({

    question: String,
    answer: String
}, { timestamps: true });

const Question = mongoose.model("questions", questionSchema);

export default Question;