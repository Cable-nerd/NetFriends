import React, { useState } from "react";
import "./Home.css";
import ProfileSide from "../../components/profileSide/ProfileSide";
import PostSide from "../../components/postSide/PostSide";
import Posts from "../../components/posts/Posts";
import RightSide from "../../components/rightSide/RightSide";


const Home = () => {
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);

  return (   
     <div className="Home">
    {!showRightPanel && (
      <button
        className="toggle-button left button"
        onClick={() => setShowLeftPanel(!showLeftPanel)}
      >
    ⇚⇛
      </button>
    )}
    {!showLeftPanel && (
      <button
        className="toggle-button right button"
        onClick={() => setShowRightPanel(!showRightPanel)}
      >
       ⇚⇛
      </button>
    )}

    <div className={`side-panel left ${showLeftPanel ? "show" : ""}`}>
      <div className="side-panel-content">
        <ProfileSide />
      </div>
    </div>

    <PostSide />

    <div className={`side-panel right ${showRightPanel ? "show" : ""}`}>
      <div className="side-panel-content">
        <RightSide />
      </div>
    </div>
  </div>
);
};

export default Home;
