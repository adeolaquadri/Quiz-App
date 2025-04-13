import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.secretkey);
    req.user = verified; // Attach decoded payload to request
    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid Token: " + e.message });
  }
};
