import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
   quizId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "quiz", 
      required: true
   },
   question:{
      type: String,
      required: true
   },
   options: {
      a: { type: String, required: true },
      b: { type: String, required: true },
      c: { type: String, required: true },
    },
   correctAnswer: { type: String, required: true, enum: ["a", "b", "c"] },
}, {timestamps: true})

const questionModel = mongoose.model("questionModel", questionSchema)

export default questionModel;