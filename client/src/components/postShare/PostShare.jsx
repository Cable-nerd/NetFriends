import React, { useEffect, useRef, useState } from "react";
import "./PostShare.css";
import ProfileImg from "../../assets/img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { UploadImage } from "../../actions/UploadAction";
import { UploadPost } from "../../actions/UploadAction";
import Profile from "../../assets/img/defaultUser.png";

const PostShare = () => {
  const loading = useSelector((state) => state.PostReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  // handle Image Change
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();
    console.log("User:", user); // Log user
    if (!user || !user._id) {
      console.error("User ID is undefined");
      return;
    }

    // post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;

      try {
        await dispatch(UploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    console.log("New Post Data:", newPost); // Log newPost
    dispatch(UploadPost(newPost));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <div className="PostShare">
      <img
        src={user.profilePicture ? serverPublic + user.profilePicture : Profile}
        alt="profile"
      />

      <div>
        <input
          ref={desc}
          required
          className="postInput"
          type="text"
          placeholder="What's happening"
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className="button ps-btn"
            onClick={(e) => handleUpload(e)}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={(e) => onImageChange(e)}
            />
          </div>
        </div>
        {image && (
          <div className="previewImg">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
