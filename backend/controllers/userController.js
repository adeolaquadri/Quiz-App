import userModel from "../models/user.js"
import bcryptjs from 'bcryptjs'
import jsonwebtoken  from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.secretkey

export const addUser = async(req, res)=>{
   try{
      const {username, email, pass, confirmpass} = req.body
      const salt = await bcryptjs.genSalt(10);
      const password = await bcryptjs.hash(pass, salt);
      const token = jsonwebtoken.sign({ username: username, email: email }, secretKey);
      const getNewUser = await userModel.findOne({
         username:username,
         email:email
      })
      if(getNewUser)
      return res.status(403).json({error: "User with the username or email provided already exist"})
      const newUser = new userModel({
        email, username, password, token
      })
      if(confirmpass !== pass)
      return res.status(403).json({error: "Passwords do not match"})
   await newUser.save();
   return res.status(200).json({success: "User added successfully"})
}catch(e){
   return res.status(500).json({error: e.message})
}
}

export const getUser = async(req, res)=>{
   try{
      const user = await userModel.find()
      if(!user){ res.status(404).json({msg: "User not found"})}
      else{
         return res.status(200).json(user)
      }
   }catch(e){
      return res.status(500).json({'Error': e.message})
   }
}

export const userAuth = async(req, res)=>{
   try{
      const {username, password} = req.body
      const user = await userModel.findOne({username})
      if(!user){         
      return res.status(404).json({Error: "Invalid Credential"})
      }
      const isPasswordValid = await bcryptjs.compare(password, user.password)
      if(isPasswordValid){
         const token = user.token
         res.cookie("token", token, {
            httpOnly: true,
            secure: true, // true means cookie only sent over HTTPS
            sameSite: "None", // Needed for cross-site requests (Render → Vercel)
          });
         return res.json({Message: "Login Successful!", user: req.user})
      }else{
         return res.status(404).json({Error: "Invalid Password!"})
      }
   }catch(e){
      return res.status(500).json({Error: e.message})
   }
}

export const deleteUser = async(req, res)=>{
   try{
      const {id} = req.params
      const user = await userModel.findByIdAndDelete(id)
      if(!user) res.status(404).json({message: "No user found!"})
      res.status(200).json({Message: "User deleted successfully!"})
   }catch(e){
      return res.status(500).json({Error: e.message})
   }
}

export const updateUser = async(req, res)=>{
   try{
      const password = await bcryptjs.hash(req.body.password, 10)
      const {_id} = req.params
      const updatedVendor = {
         username: req.body.username,
         password: password
      }
      const user = await userModel.findByIdAndUpdate(_id, updatedVendor, {new: true})
      if(!user) res.status(404).json({Message: "User not found!"})
      res.status(200).json(user)
   }catch(e){
      res.status(500).json({Error: e.message})
   }
}
export const logoutUser = async(req, res) => {
   res.cookie('token', "",{
      maxAge: 1,
      httpOnly: true
  });
  res.json({ message: "Logged out successfully!" });
};