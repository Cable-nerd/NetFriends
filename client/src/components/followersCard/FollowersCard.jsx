import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import User from "../user/User";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../api/UserRequest";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user }  = useSelector((state) => state.AuthReducer.authData);
//console.log(user);
useEffect(() => {
  const fetchPersons = async () => {
    const { data } = await getAllUsers();
    setPersons(data);
  };
  fetchPersons();
}, []);

  return (
    <div className="FollowersCard">
    <h3>People you may know</h3>
    {persons.map((person, id) => {
      if (person._id !== user._id) return <User person={person} key={id} />;
      return null; 
    })}
  </div>
);
};


export default FollowersCard;


