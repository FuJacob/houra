import dotenv from "dotenv"; // Corrected typo: dotenv instead of dontenv
dotenv.config(); // Corrected typo: dotenv instead of dontenv
import jwt from "jsonwebtoken";
// Middleware to authenticate JWT tokens
export default function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("MY AUTH HEADER:", authHeader);
  if (token == null) {
    return res.status(401).json({
      message: "Error with auth token. Did not exist",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Unsuccessful authorization with JWT.", err });
    }
    req.user = user;
    console.log(req.user);
    next();
  });
}
