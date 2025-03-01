import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
   question:{
      type: String,
      required: true
   },
   optionA:{
      type: String,
      required: true
   },
   optionB:{
      type: String,
      required: true
   },
   optionC:{
      type: String,
      required: true
   },
   correct:{
      type: String,
      required: true
   }
}, {timestamps: true})

const questionModel = mongoose.model("questionModel", questionSchema)

export default questionModel;