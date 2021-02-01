import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./login.css";
import API from "../../utils/API.js";

function Login(props) {
  let history = useHistory();

  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: ""
  });

  useEffect(function () {
    if(props.userState.isLoggedIn === true){
      props.setPageState({ currentPage: "landing" });
      return history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userState]);

  function handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setLoginFormState({...loginFormState, [name]: value});
    props.setUserState({ ...props.userState, loginError: "" });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    API.loginUser(loginFormState).then(function (newToken) {
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
        props.setUserState({ ...props.userState, loginError: "Login failed" });
      }
    });
  }

  return (
    <div>
      <div className="row">
            <div className="col-12">
              <h1> Login </h1>
              <>
              <form className="form-signin" onSubmit={handleFormSubmit}>
                {props.userState.loginError === ""
                  ? <br />
                  : <p className="error-message" > {props.userState.loginError} </p>
                }
                <label>Email address:</label>
                <input 
                  type="email"  
                  className="form-control" 
                  placeholder="Email address" 
                  required=""
                  name="email" 
                  value={loginFormState.email || ""} 
                  onChange={handleInputChange}
                />
                <br />
                <label>Password:</label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Password" 
                  required="" 
                  name="password" 
                  value={loginFormState.password || ""} 
                  onChange={handleInputChange}
                />
                <br />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
              </form>
              </>
                {/* <form onSubmit={handleFormSubmit} className="search-style">
                <div className="row">
                  <div className="col-2">
                    <label for="inputEmail"> Email </label>
                  </div>
                  <div className="col-10">
                    <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <label for="inputPassword"> Password </label>
                  </div>
                  <div className="col-10">
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <input type="submit" value="Search" />
                  </div>
                </div>
                </form> */}
            </div>
        </div>
    </div>
  );
}

export default Login;