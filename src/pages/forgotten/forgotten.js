import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./forgotten.css";
import API from "../../utils/API.js";
import emailjs from 'emailjs-com';
import {Spinner} from "react-bootstrap";

function Forgotten(props) {
  let history = useHistory();

  const [forgottenPassword, setForgottenPassword] = useState({
    email: "",
    show: false,
    message: "",
    error: false,
    match: false,
  });

  const [loggingState, setLoggingState] = useState({
    logging: false
  });

  function handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setForgottenPassword({...forgottenPassword, [name]: value, show: false});
  }

  function doneReset() {
    props.setPageState({ currentPage: "landing" });
    return history.push("/landing");
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    setLoggingState({ logging: true });
    API.emailCheck(forgottenPassword.email).then(function (foundUser) {
      if(foundUser){
        if(foundUser.isActive === false){
          setLoggingState({ logging: false });
          setForgottenPassword({ ...forgottenPassword, email: "", message: `Your account has been deactivated. Please contact customer support.`, show: true, error: true, match: false});
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
                setLoggingState({ logging: false });
                setForgottenPassword({ ...forgottenPassword, email: "", message: `An email will be sent to ${foundUser.email} with instructions to reset your password`, show: true, error: false, match: true});
                // console.log('SUCCESS!', response.status, response.text);
              }, function(error) {
                setLoggingState({ logging: false });
                setForgottenPassword({ ...forgottenPassword, email: foundUser.email, message: `There was a problem sending an email to ${foundUser.email}. Please contact customer support or try again later.`, show: true, error: true, match: false});
                // console.log('FAILED...', error);
              });
            }
            else{
              setLoggingState({ logging: false });
              setForgottenPassword({ ...forgottenPassword, email: "", message: `An error has occurred. Please double check your email and try again later.`, show: true, error: true, match: false});
            }
          });
        }
      }
      else{
        //failed to find user with that email
        const check = forgottenPassword.email;
        setLoggingState({ logging: false });
        setForgottenPassword({ ...forgottenPassword, email: "", message: `Unable to find ${check}. Please double check your email and try again later.`, show: true, error: true, match: false});
      }
    });
   
  }

  return (
    <div>
      <div className="row">
            <div className="col-12">
              <h1> Password Reset </h1>
              {forgottenPassword.match === false
              ?
                <form className="resetForm" onSubmit={handleFormSubmit}>
                  {forgottenPassword.show === true
                    ? <> <h2 className="errorMessage" > {forgottenPassword.message} </h2> <br /> </>
                    : null
                  }
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
                  {loggingState.logging === false
                    ? <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                    : 
                      <button className="btn btn-lg btn-primary btn-block" disabled>
                        <Spinner
                          as="span"
                          animation="border"
                          role="status"
                          aria-hidden="true"
                        />
                      </button>
                  }
                  <br />
                </form>
              :
                <div className="resetForm"> 
                  <br />
                  <h2 className="noError" > {forgottenPassword.message} </h2>
                  <br /> <br />
                  <button className="btn btn-lg btn-primary btn-block" onClick={doneReset}>Ok</button>
                  <br />
                </div>
              }
            </div>
        </div>
    </div>
  );
}

export default Forgotten;