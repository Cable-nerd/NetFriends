import React from 'react'
import FollowersCard from "../followersCard/FollowersCard"
import ProfileCard from "../profileCard/ProfileCard"
import LogoSearch from "../logoSearch/LogoSearch"

import "./ProfileSide.css"
const ProfileSide = () => {
  
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <ProfileCard location = "homepage"/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileSide