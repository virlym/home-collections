import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./accountVerification.css";
import API from "../../utils/API.js";

function AccountVerification(props) {
  let history = useHistory();

  const [verifyCheck, setVerifyCheck] = useState({
    match: false,
    message: ""
  });

  useEffect(function () {
    checkUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkUrl() {
    const url = window.location.href;
    const user = url.split('/')[4];
    const key = decodeURIComponent(url.split('/')[5]);
    console.log(user);
    console.log(key);

    if((user) && (key)){
      API.verifyCheck(user).then(function (newCheck) {
        if(newCheck){
          console.log(newCheck);
          if(newCheck.isActive === true){
            setVerifyCheck({ ...verifyCheck, message: "Your account has already been activated.-Please log in.", match: true });
          }
          else if(newCheck.newUser === false){
            setVerifyCheck({ ...verifyCheck, message: "Your account has been deactivated.-Please contact support to reactivate it." });
          }
          else if(newCheck.password !== key){
            setVerifyCheck({ ...verifyCheck, message: "Please check the URL.-Make sure it matches what was sent to your email." });
            console.log(key);
            console.log(newCheck.password);
          }
          else{
            console.log("url matches");
            setVerifyCheck({ ...verifyCheck, message: "Validating account now.-Please wait." });
            API.verifyUser(user).then(function (verifiedUser) {
              if(verifiedUser){
                setVerifyCheck({ message: "Account has been verified.-You may now log in.", match: true });
              }
              else{
                setVerifyCheck({ ...verifyCheck, message: "Something went wrong. Please contact support.-" });
              }
            });
          }
        }
        else{
          console.log("didn't find the user");
        }
      });
    }
  }

  function toLogin() {
    props.setPageState({ currentPage: "login" });
    return history.push("/login");
  }

  return (
    <div>
      <div className="row">
            <div className="col-12">
              <h1> Verification </h1>
              <br />
              <div className="center-style">
                <p> {verifyCheck.message.split('-')[0]} </p>
                <p> {verifyCheck.message.split('-')[1]}</p>
                {verifyCheck.match === true
                  ? <button className="btn btn-lg btn-primary" onClick={toLogin}>Login</button>
                  : null
                }
              </div>
              
            </div>
        </div>
    </div>
  );
}

export default AccountVerification;