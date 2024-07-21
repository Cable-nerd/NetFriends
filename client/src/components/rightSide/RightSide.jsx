import React from "react";
import Home from "../../assets/img/home.png";
import Noti from "../../assets/img/noti.png";
import Comment from "../../assets/img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import "./RightSide.css";
import TrendCard from "../trendCard/TrendCard";
import ShareModal from "../shareModel/ShareModel";
import { Link } from "react-router-dom";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div className="navIcon">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <Link to="../chat">
          <img src={Comment} alt="" />
        </Link>
      </div>

      <TrendCard />

      <ShareModal />
    </div>
  );
};

export default RightSide;
