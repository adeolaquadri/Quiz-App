import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const verified = jwt.verify(token, process.env.secretkey);
      req.user = verified;
      next();
    } catch (e) {
      return res.status(403).json({ message: e.message });
    }
  };
  
