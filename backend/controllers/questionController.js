import questionModel from "../models/question.js";

export const addQuestion = async(req, res)=>{
   try{
      const {quizId, question, options, correctAnswer}= req.body
      const newQuestion = new questionModel({
        quizId, question, options, correctAnswer
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

export const getQuestion = async(req, res)=>{
   try{
      const questions = await questionModel.find({quizId: req.params.id})
      if(questions.length === 0){
         return res.status(404).json({msg: "No question found!"})
      }
      return res.status(200).json(questions)
   }catch(e){
      return res.status(500).json({'Error': e.message})
   }
}
export const deleteQuestion = async(req, res)=>{
   try{
      const {id} = req.params
      const deleteQuestionbyid = await questionModel.findByIdAndDelete(id)
      if(!deleteQuestionbyid){ res.status(404).json({msg: "Question not found"})}
      else{
      res.status(200).json({msg: "Question deleted successfully!"})
      }
   }catch(e){
      return res.status(500).json({'Error': e.messsage})
   }
}