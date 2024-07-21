import React from "react";
import "./LogoSearch.css";
import Logo from "../../assets/img/logo.png";
import Search from "../../assets/img/search.png";
import UilSearch from '@iconscout/react-unicons/icons/uil-search'

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search form-outlin input-group">
        <input
          type="text"
          className="text-profileSlide"
          placeholder="#Explore"
        />
        <div className="s-icon">
        <UilSearch />
        </div>
   
      </div>
    </div>
  );
};

export default LogoSearch;
