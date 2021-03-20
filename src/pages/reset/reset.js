import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./reset.css";
import API from "../../utils/API.js";

function Reset(props) {
  let history = useHistory();

  const [resetCheck, setResetCheck] = useState({
    match: false,
    message: "",
    password: "",
    confirm: "",
    typo: false,
    updated: false,
    collected: ""
  });

  useEffect(function () {
    checkUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkUrl() {
    const url = window.location.href;
    const user = url.split('/')[4];
    const key = decodeURIComponent(url.split('/')[5]);

    if((user) && (key)){
      API.verifyCheck(user).then(function (newCheck) {
        if(newCheck){
          if(newCheck.isActive === false){
            setResetCheck({ ...resetCheck, message: "Your account has been deactivated.-Please contact support to reactivate it.", match: false, typo: false, updated: false });
          }
          else if(newCheck.newUser === false){
            setResetCheck({ ...resetCheck, message: "This email link has expired.-Please double check the URL", match: false, typo: false, updated: false });
          }
          else if(newCheck.password !== key){
            setResetCheck({ ...resetCheck, message: "Please check the URL.-Make sure it matches what was sent to your email.", match: false, typo: false, updated: false });
          }
          else{
            setResetCheck({ ...resetCheck, message: "Validating account now.-Please wait.", match: true, typo: false, updated: false, collected: newCheck.password });
          }
        }
        else{
          setResetCheck({ ...resetCheck, message: "This email link has expired.-Please double check the URL", match: false, typo: false, updated: false });
        }
      });
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if(resetCheck.password !== resetCheck.confirm){
      setResetCheck({ ...resetCheck, message: "Passwords must match", match: true, typo: true, updated: false, password: "", confirm: "" });
    }
    else{
      const url = window.location.href;
      const user = url.split('/')[4];
      const key = decodeURIComponent(url.split('/')[5]);
      if(key === resetCheck.collected){
        API.resetPass(user, resetCheck.password).then(function (updatedUser) {
          if(updatedUser){
            setResetCheck({ ...resetCheck, message: "You password has been reset.-Please login with your new password.", match: true, typo: false, updated: true, password: "", confirm: "" });
          }
          else{
            setResetCheck({ ...resetCheck, message: "Double check password requirements", match: true, typo: true, updated: false, password: "", confirm: "" });
          }
        });
      }
      else{
        setResetCheck({ ...resetCheck, message: "Please check the URL.-Make sure it matches what was sent to your email.", match: false, typo: false, updated: false, password: "", confirm: "" });
      }
    }
  }

  function handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setResetCheck({...resetCheck, [name]: value, typo: false, message: "" });
  }

  function toLogin() {
    props.setPageState({ currentPage: "login" });
    return history.push("/login");
  }

  return (
    <div>
      <div className="row">
            <div className="col-12">
              <h1> Password Reset </h1>
              <br />
              <div className="center-style">
                {resetCheck.updated === false
                  ?
                    resetCheck.match === true
                      ? 
                      <form className="resetForm" onSubmit={handleFormSubmit}>
                        {resetCheck.typo === true
                          ? <> <h2 className="errorMessage" > {resetCheck.message} </h2> <br /> </>
                          : null
                        }
                        <label>Password (6-24 letters/numbers):</label>
                        <input 
                          type="password"  
                          className="form-control" 
                          placeholder="Password" 
                          required=""
                          name="password" 
                          value={resetCheck.password || ""} 
                          onChange={handleInputChange}
                        />
                        <label>Confirm Password:</label>
                        <input 
                          type="password"  
                          className="form-control" 
                          placeholder="Confirm Password" 
                          required=""
                          name="confirm" 
                          value={resetCheck.confirm || ""} 
                          onChange={handleInputChange}
                        />
                        <br />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                        <br />
                      </form>
                      : 
                        <>
                          <p> {resetCheck.message.split('-')[0]} </p>
                          <p> {resetCheck.message.split('-')[1]}</p>
                        </>
                  :
                    <>
                      <p> {resetCheck.message.split('-')[0]} </p>
                      <p> {resetCheck.message.split('-')[1]}</p>
                      <button className="btn btn-lg btn-primary" onClick={toLogin}>Login</button>
                    </>
                }
              </div>
              
            </div>
        </div>
    </div>
  );
}

export default Reset;