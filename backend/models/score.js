import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: { 
   type: mongoose.Schema.Types.ObjectId, 
   ref: "userModel", required: true 
},
  quizId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "quizModel", 
    required: true },
  score: { 
   type: Number, 
   required: true 
  },
  totalQuestions: {
    type: Number, 
    required: true
    },
  percentage: {
    type: Number
    },
  date:{ type: Date, default: Date.now },
});

const scoreModel = mongoose.model("scoreModel", scoreSchema)

export default scoreModel;