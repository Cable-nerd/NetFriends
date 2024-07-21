import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/PostAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user }  = useSelector((state) => state.AuthReducer.authData);
  let posts = useSelector((state) => state.PostReducer.posts)
  let loading = useSelector((state) => state.PostReducer.loading)

  // Added console.log statements for debugging
  console.log("User:", user);
  console.log("User ID:", user ? user._id : "No user ID");
  //console.log("Posts img:", posts.image); idk why but this is undefined
  useEffect(() => {
    if (user && user._id) {
      dispatch(getTimelinePosts(user._id));
      console.log("Timeline posts requested for user ID:", user._id);
    }
  }, [dispatch, user]); // remove user to render posts once

  // Ensure posts is always an array using Object.values
  posts = Object.values(posts || {});

  let filteredPosts = posts;
  if (params.id) {
    filteredPosts = posts.filter((post) => post.userId === params.id);
  }

  return (
    <div className="Posts">
      {loading ? (
        "Fetching posts...."
      ) : (
        filteredPosts.map((post, id) => {
          console.log("Rendering post:", post);
          return <Post data={post} key={id} />;
        })
      )}
    </div>
  );
};

export default Posts;



