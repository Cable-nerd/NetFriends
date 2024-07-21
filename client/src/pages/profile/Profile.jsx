import React, { useState } from "react";
import "./Profile.css"
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import ProfileCard from "../../components/profileCard/ProfileCard";
import PostSide from "../../components/postSide/PostSide";
import RightSide from "../../components/rightSide/RightSide";



const Profile = () => {
    const [showLeftPanel, setShowLeftPanel] = useState(false);
    const [showRightPanel, setShowRightPanel] = useState(false);
    const handleToggleLeft = () => {
        setShowLeftPanel(!showLeftPanel);
        if (!showLeftPanel) {
          setShowRightPanel(false); // Hide right panel when left panel is shown
        }
      };
    
      const handleToggleRight = () => {
        setShowRightPanel(!showRightPanel);
        if (!showRightPanel) {
          setShowLeftPanel(false); // Hide left panel when right panel is shown
        }
      };
return (
    <div className="Profile">
    {!showRightPanel && (
      <button
        className="toggle-button left button"
        onClick={handleToggleLeft}
      >
        ⇚⇛
      </button>
    )}
    {!showLeftPanel && (
      <button
        className="toggle-button right button"
        onClick={handleToggleRight}
      >
        ⇚⇛
      </button>
    )}

    <div className={`side-panel left ${showLeftPanel ? "show" : ""}`}>
      <div className="side-panel-content">
        <ProfileLeft />
      </div>
    </div>

    <div className="Profile-center">
      <ProfileCard location="profilePage" />
      <PostSide />
    </div>

    <div className={`side-panel right ${showRightPanel ? "show" : ""}`}>
      <div className="side-panel-content">
        <RightSide />
      </div>
    </div>
  </div>
);
};
export default Profile