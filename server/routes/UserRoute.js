import express from "express";
import {
  DeleteUser,
  FollowUser,
  GetUser,
  UnFollowUser,
  UpdateUser,
  getAllUsers,
} from "../controllers/UserController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/:id", GetUser); // Retrieves a user by ID.
router.get("/", getAllUsers); // Retrieves all users.
router.put("/:id",authMiddleware, UpdateUser); // Updates a user.
router.delete("/:id",authMiddleware, DeleteUser); //  Deletes a user.

router.put("/:id/follow",authMiddleware, FollowUser); // Follows a user.
router.put("/:id/unfollow",authMiddleware, UnFollowUser); // Unfollows a user.

export default router;













