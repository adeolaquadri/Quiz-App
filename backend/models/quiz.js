import mongoose from "mongoose";

// Define the Quiz schema and model
const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: {type: String},
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const quizModel = mongoose.model("quizModel", QuizSchema)

export default quizModel;