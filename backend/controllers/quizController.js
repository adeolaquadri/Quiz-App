import quizModel from "../models/quiz.js";

export const addQuiz = async(req, res)=>{
    try{
        const {title, description, category} = req.body
        const newQuiz = new quizModel({
          title, description, category
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
        return res.status(200).json(quiz)
     }catch(e){
        return res.status(500).json({'Error': e.message})
     }
}