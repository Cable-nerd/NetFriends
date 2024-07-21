import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import ProfileModal from "../profileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest.js";
import { logOut } from "../../actions/AuthAction.js";

//import ProfileModal from "../profileModal/ProfileModal";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  // something wrong with the profileUser json structure
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.AuthReducer.authData);
  console.log("Authenticated user:", user);
  useEffect(() => {
    
    const fetchProfileUser = async () => {
      try {
        if (profileUserId === user._id) {
          setProfileUser(user);
          
        } else {
          const profileUser = await UserApi.getUser(profileUserId);
          setProfileUser(profileUser);
          console.log("Fetched profile user data:", profileUser);
        }
      } catch (error) {
        console.error("Error fetching profile user:", error);
      }
    };
    console.log(user);
    fetchProfileUser();
    console.log("profileUser in InfoCard.jsx : " + profileUser)
  }, [user]);

  const handleLogout = () => {
    dispatch(logOut());
    console.log("User logged out");
  };
  //console.log("InfoCard render - profileUser:", profileUser);


  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            
            <ProfileModal
          
              data = {user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>

        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};


export default InfoCard;






