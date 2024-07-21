import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";
//import Profile from "../../assets/img/defaultProfile.png";
import "./Conversation.css"
const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    console.log(userId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data); // it is object, need to convert it into array
        console.log("user data" + data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
    <div className="follower conversation">
      <div>
        {online && <div className="online-dot"></div>}
        <img
          src={
            userData?.profilePicture
              ? import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER +
                userData.profilePicture
              : import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
          }
          className="followerImage"
          alt=""
        />
        <div className="name" style={{fontSize: "0.8rem"}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span>{online? "Online" : "Offline"}</span>
        </div>
      </div>
    </div>
    <hr style={{width: "85%", border: "0.1px solid #ececec"}} />
    </>
  );
};
export default Conversation;


// 53:05