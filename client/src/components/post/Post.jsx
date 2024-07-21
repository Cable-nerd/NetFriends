import React, { useState } from "react";
import "./Post.css";
import Comment from "../../assets/img/comment.png";
import Share from "../../assets/img/share.png";
import NotLike from "../../assets/img/notLike.png";
import Heart from "../../assets/img/like.png";
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";


const Post = ({ data }) => {
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [liked, setLiked] = useState(data.likes ? data.likes.includes(user._id) : false);
  const [likes, setLikes] = useState(data.likes ? data.likes.length : 0);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const handleLike = () => {
    if (data && user) {
      try {
        setLiked((prev) => !prev);
        likePost(data._id, user._id);
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
        console.log("After like:", liked);
      } catch (error) {
        console.log("handleLike error: " + error);
      }
    }
  };
  /*
  console.log("post images" +
    data.image ? serverPublic + data.image : ""
  );
  */
  //console.log("Rendering Post component with data:", data); // rendering posts data inclcudiong img url

  
  return (
    <div className="Post">
      <img src={data.image ? serverPublic + data.image : ""} alt="" />
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};
export default Post;

