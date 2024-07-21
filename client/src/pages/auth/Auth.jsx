import React, { useState } from "react";
import Logo from "../../assets/img/logo.png";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import { logIn, signUp } from "../../api/AuthRequest";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=> state.AuthReducer.loading)
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(true);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);




  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      username: "",
    });
  };

  return (
  
 <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Syncify</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* right side */}
      <div className="a-right">
        <form action="" className="infoForm authForm"  onSubmit={(e) => handleSubmit(e)}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={(e) => handleChange(e)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              placeholder="Username"
              name="username"
              value={data.username}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => handleChange(e)}
              required
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                value={data.confirmpass}
                onChange={(e) => handleChange(e)}
                required
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "Red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not the same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
                
              }}
            >
              {isSignUp
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up!"}
            </span>
          </div>
          <button
            className="button info-btn"
            type="submit"
            disabled={loading}
          >
            {loading? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  
   
  );
};

export default Auth;







