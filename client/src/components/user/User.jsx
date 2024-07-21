import react, { useState } from "react"
import Profile from "../../assets/img/defaultUser.png"
import { useDispatch, useSelector } from "react-redux";
import { FollowUser, UnFollowUser } from "../../actions/UserAction";




const User = ({ person }) => {
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [following, setFollowing] = useState(person.followers.includes(user._id));

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      if (following) {
        await dispatch(UnFollowUser(person._id, user._id));
      } else {
        await dispatch(FollowUser(person._id, user._id));
      }
      setFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error toggling follow:", error);
      // Handle error state or logging here
    }
  };

  return (
    <div className="followers">
      <div>
        <img
          src={person.profilePicture ? serverPublic + person.profilePicture : Profile}
          alt=""
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button
        className={following ? "button fc-btn UnFollowBtn" : "button fc-btn"}
        onClick={(e) => handleFollow(e)}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default User

