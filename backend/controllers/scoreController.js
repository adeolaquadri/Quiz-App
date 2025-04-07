import scoreModel from "../models/score.js"

export const addScore = async(req, res)=>{
   try{
      const {username, quizId, score, totalQuestions, percentage} = req.body
      const newScore = new scoreModel({
        username, quizId, score, totalQuestions, percentage
       })
       await newScore.save();
       return res.status(200).json({success: "Score added successfully"})
   }catch(e){
      return res.status(500).json({message: e.message})
   }
}

export const getAllScore = async(req, res)=>{
   try{
         const score = await scoreModel.find()
         if(!score || score.length === 0){ res.status(404).json({msg: "No score found!"})}
         else{
            return res.status(200).json(score)
            }
   }catch(e){
      return res.status(500).json({message: e.message})
   }
}

export const deleteAllScore = async(req, res)=>{
   try{
      const score = await scoreModel.deleteMany()
      if(!score || score.length === 0) return res.status(404).json({msg: "No score found!"})
      return res.status(200).json({msg: "All scores deleted successfully!"})
   }catch(e){
     return res.status(500).json({message: e.message})
   }
}