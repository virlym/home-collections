import React from "react";
import "./accountVerification.css";
import emailjs from 'emailjs-com';

function AccountVerification(props) {

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

  return (
    <div>
      <div className="row">
            <div className="col-12">
              <h1> Verification </h1>
              <button className="btn btn-lg btn-primary" onClick={testEmail}>Create Account</button>
            </div>
        </div>
    </div>
  );
}

export default AccountVerification;