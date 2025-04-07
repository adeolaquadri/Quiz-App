import quizModel from "../models/quiz.js";

export const addQuiz = async(req, res)=>{
    try{
        const {title, description, category, image} = req.body
        const newQuiz = new quizModel({
          title, description, image, category
        })
        await newQuiz.save();
        return res.status(200).json({Success: "Quiz added successfully"})
     }catch(e){
        return res.status(500).json({Error: e.message})
     }
}

   
export const getQuiz = async(req, res)=>{
    try{
        const quiz = await quizModel.find()
        if(quiz.length === 0){
           return res.status(404).json({msg: "No quiz found in database!"})
        }
        return res.status(200).json({quiz:quiz, user:req.user})
     }catch(e){
        return res.status(500).json({'Error': e.message})
     }
}



export const deleteQuiz = async(req, res)=>{
   try{
      const {id} = req.params
      const deleteQuizbyid = await quizModel.findByIdAndDelete(id)
      if(!deleteQuizbyid){ res.status(404).json({msg: "Quiz not found"})}
      else{
      res.status(200).json({msg: "Quiz deleted successfully!"})
      }
   }catch(e){
      return res.status(500).json({'Error': e.messsage})
   }
}

export const getQuizImage = async(req, res)=>{
   try{
      const {id} = req.params
      const getQuizImagebyId = await quizModel.findById(id)
      if(!getQuizImagebyId){ res.status(404).json({msg: "Quiz image not found"})}
      else{
      res.status(200).json({image: getQuizImagebyId.image})
      }
   }catch(e){
      return res.status(500).json({'Error': e.messsage})
   }
}