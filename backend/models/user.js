import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: { type: String, enum: ["user", "admin"], default: "user" },
   scores: [
      {
      quizId:{type: mongoose.Schema.Types.ObjectId, ref: Quiz},
      score:{},
      date:{type: Date, default: Date.now}
      }
   ],
   attempts: { type: Number, default: 0 }
})

const userModel = mongoose.model("userModel", userSchema)

export default userModel;