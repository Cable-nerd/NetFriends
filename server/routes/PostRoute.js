import express from "express";
import {
  CreatePost,
  GetPost,
  UpdatePost,
  DeletePost,
  getTimelinePosts,
  likePost,
} from "../controllers/PostController.js";
//import authMiddleWare from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/", CreatePost);
router.get("/:id", GetPost);
router.put("/:id", UpdatePost);
router.delete("/:id", DeletePost);
router.put("/:id/like", likePost);
router.get('/:id/timeline', getTimelinePosts)


export default router;




