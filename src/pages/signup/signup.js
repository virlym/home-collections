import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import "./signup.css";
import API from "../../utils/API.js";

function Signup(props) {
  let history = useHistory();

  const [signUpFormState, setSignUpFormState] = useState({
    email: "",
    password: ""
  });

  useEffect(function () {
    if(props.userState.isLoggedIn === true){
      props.setPageState({ currentPage: "landing" });
      return history.push("/landing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userState]);

  function handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setSignUpFormState({...signUpFormState, [name]: value});
    props.setUserState({ ...props.userState, signUpError: "" });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    API.createUser(signUpFormState).then(function (newUser) {
      if(newUser){
        API.loginUser(signUpFormState).then(function (newToken) {
          if(newToken){
            localStorage.setItem("token", newToken.token);
            API.getProfile(newToken.token).then(function (data){
              props.setUserState({
                email: data.email,
                token: newToken.token,
                id: data.id,
                isLoggedIn: true,
                loginError: "",
                signUpError: "",
                books: [],
                movies: [],
                albums: []
              });
            });
          }
          else{
            //login failed
            props.setUserState({ ...props.userState, signUpError: "Sign Up failed" });
          }
        });
      }
      else{
        //signUp failed
        props.setUserState({ ...props.userState, signUpError: "Sign Up failed" });
      }
    });
  }

  return (
    <div>
      <div className="row">
            <div className="col-12">
              <h1> Sign Up </h1>
              <form className="form-signup" onSubmit={handleFormSubmit}>
                {props.userState.signUpError === ""
                  ? <br />
                  : <p className="error-message" > {props.userState.signUpError} </p>
                }
                <label>Email address:</label>
                <input 
                  type="email"  
                  className="form-control" 
                  placeholder="Email address" 
                  required=""
                  name="email" 
                  value={signUpFormState.email || ""} 
                  onChange={handleInputChange}
                />
                <br />
                <label>Password (6-24 letters/numbers):</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Password" 
                  required="" 
                  name="password" 
                  value={signUpFormState.password || ""} 
                  onChange={handleInputChange}
                />
                <br />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Create Account</button>
                <br />
                <div className="center-style">
                  Already have an account? 
                  <br />
                  <Link to="/login" onClick={function(){ props.setPageState({currentPage: "login"})}}>
                    Click here to login
                  </Link>
                </div>
              </form>
            </div>
        </div>
    </div>
  );
}

export default Signup;