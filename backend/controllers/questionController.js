import questionModel from "../models/questions.js";

export const addQuestion = async(req, res)=>{
   try{
      const {question, optionA, optionB, optionC, correct}= req.body
      const newQuestion = new questionModel({
         question, optionA, optionB, optionC, correct
      })
      await newQuestion.save();
      return res.status(200).json({Success: "Question added successfully"})
   }catch(e){
      return res.status(500).json({Error: e.message})
   }
}

export const getQuestions = async(req, res)=>{
   try{
      const question = await questionModel.find()
      if(question.length === 0){
         return res.status(404).json({msg: "No question found in database!"})
      }
      return res.status(200).json(question)
   }catch(e){
      return res.status(500).json({'Error': e.message})
   }
}