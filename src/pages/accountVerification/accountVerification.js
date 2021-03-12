import React, { useState, useEffect } from "react";
import "./accountVerification.css";
import emailjs from 'emailjs-com';
import API from "../../utils/API.js";

function AccountVerification(props) {

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
            setVerifyCheck({ ...verifyCheck, message: "Your account has already been activated." });
          }
          else if(newCheck.newUser === false){
            setVerifyCheck({ ...verifyCheck, message: "Your account has been deactivated." });
          }
          else if(newCheck.password !== key){
            setVerifyCheck({ ...verifyCheck, message: "Please check the URL and make sure it matches what was sent to your email." });
            console.log(key);
            console.log(newCheck.password);
          }
          else{
            console.log("url matches");
            setVerifyCheck({ ...verifyCheck, message: "Validating account now" });
            API.verifyUser(user).then(function (verifiedUser) {
              if(verifiedUser){
                setVerifyCheck({ message: "Account has been verified. You may now log in.", match: true });
              }
              else{
                setVerifyCheck({ ...verifyCheck, message: "Something went wrong. Please contact support." });
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

  function testEmail() {
    console.log("test");
    const url = window.location.href;
    const user = url.split('/')[4];
    const key = url.split('/')[5];
    console.log(user);
    console.log(key);

    let data = {
      to_email: 'virlym@gmail.com',
      verify_url: url
    } 

    emailjs.send(process.env.REACT_APP_EMAIL_SERVICE, process.env.REACT_APP_EMAIL_VERIFICATION_TEMPLATE, data, process.env.REACT_APP_EMAIL_USER)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

  }

  function testUrl() {
    const url = window.location.href;
    const user = url.split('/')[4];
    const ePass = url.split('/')[5];
    const key = decodeURIComponent(ePass);
    console.log(ePass);
    console.log(key);
  }

  return (
    <div>
      <div className="row">
            <div className="col-12">
              <h1> Verification </h1>
              <p> {verifyCheck.message} </p>
              <button className="btn btn-lg btn-primary" onClick={testUrl}>Create Account</button>
            </div>
        </div>
    </div>
  );
}

export default AccountVerification;