import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication failed: No token provided" });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired", expiredAt: err.expiredAt });
        } else {
          return res.status(401).json({ message: "Authentication failed: Invalid token" });
        }
      }
      req.body._id = decoded.id;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
