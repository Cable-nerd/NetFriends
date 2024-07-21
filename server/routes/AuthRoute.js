import express from "express";
import { LoginUser, registerUser } from "../controllers/AuthController.js";
//import jwt from "jsonwebtoken";
//import UserModel from "../models/UserModel.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", LoginUser);

// Endpoint to handle refresh token requests
/*
router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'Authentication failed!' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const user = await UserModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found!' });

    const newAccessToken = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: '15m' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});
*/
export default router;
