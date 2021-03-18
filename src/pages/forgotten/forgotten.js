import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import "./forgotten.css";
import API from "../../utils/API.js";

function Forgotten(props) {
  let history = useHistory();

  const [forgottenPassword, setForgottenPassword] = useState({
    email: "",
    match: false,
    message: ""
  });

  useEffect(function () {
    // checkUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setForgottenPassword({...forgottenPassword, [name]: value});
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    API.emailCheck(forgottenPassword.email).then(function (foundUser) {
      if(foundUser){
        if(foundUser.isActive === false){
          setForgottenPassword({ ...forgottenPassword, email: "", message: `Your account has been deactivated. Please contact customer support.`, match: true});
        }
        else{
          const data = {
            to_email: foundUser.email,
            password_change_url: `${process.env.REACT_APP_PASSWORD_CHANGE_BASE}${foundUser.id}/${encodeURIComponent(foundUser.password)}`
          }
          API.changePass(foundUser.id, true).then(function (changed) {
            if(changed){
              emailjs.send(process.env.REACT_APP_EMAIL_SERVICE, process.env.REACT_APP_CHANGE_PASS_TEMPLATE, data, process.env.REACT_APP_EMAIL_USER)
              .then(function(response) {
                setForgottenPassword({ ...forgottenPassword, email: "", message: `An email will be sent to ${foundUser.email} with instructions to reset your password`, match: true});
                // console.log('SUCCESS!', response.status, response.text);
              }, function(error) {
                setForgottenPassword({ ...forgottenPassword, email: newUser.email, message: `There was a problem sending an email to ${foundUser.email}. Please contact customer support or try again later.`, visible: true, success: false});
                // console.log('FAILED...', error);
              });
            }
            else{
              setForgottenPassword({ ...forgottenPassword, email: "", message: `An error has occurred. Please double check your email and try again later.`, match: true});
            }
          });
        }
      }
      else{
        //failed to find user with that email
        setForgottenPassword({ ...forgottenPassword, email: "", message: `An error has occurred. Please double check your email and try again later.`, match: true});
      }
    });
   
  }

  return (
    <div>
      <div className="row">
            <div className="col-12">
              <h1> Password Reset </h1>
              <form className="resetForm" onSubmit={handleFormSubmit}>
                <label>Email address:</label>
                <input 
                  type="email"  
                  className="form-control" 
                  placeholder="Email address" 
                  required=""
                  name="email" 
                  value={forgottenPassword.email || ""} 
                  onChange={handleInputChange}
                />
                <br />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                <br />
              </form>
            </div>
        </div>
    </div>
  );
}

export default Forgotten;