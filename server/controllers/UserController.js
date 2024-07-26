import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypts";
import jwt from "jsonwebtoken"


// get a user
export const GetUser = async (req, res) => {
  const  id  = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find()
    users = users.map((user) => {
      const {password,...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}


// update user
export const UpdateUser = async (req, res) => {  
  const id = req.params.id;
  console.log("Data Received", req.body);
  const { _id, password } = req.body;
  console.log("ID:", _id, "Password:", password);

  if (id === _id) {
    try {
      // Handle password hashing if it needs to be updated
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      // Update user in the database
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!user) {
        console.error("User not found");
        return res.status(404).json("User not found");
      }

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      console.log("Updated user:", user, "Token:", token);
      res.status(200).json({ user, token });
    } catch (error) {
      console.error("Error updating user:", error.message, error.stack);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  } else {
    res.status(403).json("Access Denied! You can update only your own Account.");
  }
};

// Delete User
export const DeleteUser = async (req, res) => {

  const  id  = req.params.id;

  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Successfully!");
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Access Denied!");
  }
};

// follow user
// follow user
export const FollowUser = async (req, res) => {
  const id = req.params.id;// ID of the user to follow
  const { _id } = req.body;
 // const bodyKeys = Object.keys(req.body) 
 // const { _id } = bodyKeys[0]; // ID of the current user (follower)

 // console.log("Request Body:", req.body);

  console.log("User to follow ID:", id);
  console.log("Current user ID:", _id);

  if (_id === id) {
    return res.status(403).json("Action Forbidden: You cannot follow yourself");
  }

  try {
    const followUser = await UserModel.findById(id);
    const followingUser = await UserModel.findById(_id);

    if (!followUser) {
      return res.status(404).json("User to follow not found");
    }
    if (!followingUser) {
      return res.status(404).json("Current user not found");
    }

    if (!followUser.followers.includes(_id)) {
      await followUser.updateOne({ $push: { followers: _id } });
      if (followingUser) {
        await followingUser.updateOne({ $push: { following: id } });
      } else {
        return res.status(404).json("Current user not found");
      }
      return res.status(200).json("User followed!");
    } else {
      return res.status(403).json("You are already following this user");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};


//unfollow user

export const UnFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const unFollowUser = await UserModel.findById(id);
      const unFollowingUser = await UserModel.findById(_id);

      if (unFollowUser.followers.includes(_id)) {
        await unFollowUser.updateOne({ $pull: { followers: _id } });
        await unFollowingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("Unfollowed Successfully!");
      } else {
        res.status(403).json("You are not following this User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};



