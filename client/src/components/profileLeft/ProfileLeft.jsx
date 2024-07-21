import React from "react";

import "../profileSide/ProfileSide.css"
import InfoCard from "../infoCard/InfoCard";
import LogoSearch from "../logoSearch/LogoSearch";
import FollowersCard from "../followersCard/FollowersCard";



const ProfileLeft = () => {
    
return (
    <div className="ProfileSide">
    <LogoSearch />
    <InfoCard/>
    <FollowersCard />
    </div>
)
}
export default ProfileLeft