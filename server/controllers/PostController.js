import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";
import mongoose from "mongoose";

// create new post
export const CreatePost = async (req, res) => {
  console.log("Request body:", req.body);
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.error('CreatePost Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// get a post
export const GetPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.error('GetPost Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// update a post
export const UpdatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ message: "Post updated" });
    } else {
      res.status(403).json({ message: "Action forbidden" });
    }
  } catch (error) {
    console.error('UpdatePost Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// delete post
export const DeletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json({ message: "Post deleted" });
    } else {
      res.status(403).json({ message: "Action forbidden" });
    }
  } catch (error) {
    console.error('DeletePost Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({ message: "Post disliked" });
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({ message: "Post liked" });
    }
  } catch (error) {
    console.error('likePost Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;  // Correctly access userId from params

  try {
    // Fetch current user's posts
    const currentUserPosts = await PostModel.find({ userId: userId });

    // Aggregate following user's posts
    const followingPosts = await UserModel.aggregate([
      { 
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    // Check if followingPosts has data to avoid null reference error
    const allPosts = followingPosts[0]?.followingPosts ? currentUserPosts.concat(...followingPosts[0].followingPosts) : currentUserPosts;

    // Sort posts by creation date
    const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(sortedPosts);
  } catch (error) {
    console.error("Error fetching timeline posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



