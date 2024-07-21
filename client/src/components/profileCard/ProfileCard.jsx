import React from "react";
import Cover from "../../assets/img/cover.jpg";
import Profile from "../../assets/img/defaultUser.png";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({ location }) => {
  const  { user } = useSelector((state) => state.AuthReducer.authData);
  const  posts  = useSelector((state) => state.PostReducer.posts);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  
  console.log("profile and cover picture: " + user.profilePicture + ", " + user.coverPicture);
  
  console.log("ProfileCard.jsx user: " + user);
  console.log("posts: " + posts);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={user.coverPicture ?  serverPublic + user.coverPicture :  Cover}
          alt="CoverImage"
        />
        <img
          src={
            user.profilePicture ?  serverPublic + user.profilePicture :  Profile
          }
          alt="ProfileImage"
        />
      </div>

      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            {user.followers && user.followers.length > 0 && (
              <span>{user.followers.length}</span>
            )}

            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                {Object.values(posts).filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{
              textDecoration: "none",
              color: "orange",
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
          >
            <b>My Profile</b>
          </Link>
        </span>
      )}
    </div>
  );
};


export default ProfileCard;


// {user.following.length}





