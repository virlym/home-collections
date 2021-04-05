import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import "./signup.css";
import API from "../../utils/API.js";
import emailjs from 'emailjs-com';
import { Button, Modal, Spinner } from 'react-bootstrap';

function Signup(props) {
  let history = useHistory();

  const [signUpFormState, setSignUpFormState] = useState({
    email: "",
    password: "",
    logging: false
  });

  const [signUpConfirmState, setSignUpConfirmState] = useState({
    email: "",
    message: "",
    visible: false,
    success: false,
    created: false
  });

  useEffect(function () {
    if(signUpConfirmState.created === true){
      props.setPageState({ currentPage: "landing" });
      return history.push("/landing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpConfirmState]);

  function handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setSignUpFormState({...signUpFormState, [name]: value});
    props.setUserState({ ...props.userState, signUpError: "" });
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    setSignUpFormState({ ...signUpFormState, logging: true });
    if(/^([a-zA-Z0-9`~!@#$%^&*()_=+,.?'";:[\]{}-]{6,24})$/.test(signUpFormState.password) === false){
      if(signUpFormState.password.length < 6){
        props.setUserState({ ...props.userState, signUpError: "Password is too short" });
      }
      else if (signUpFormState.password.length > 24){
        props.setUserState({ ...props.userState, signUpError: "Password is too long" });
      }
      else{
        props.setUserState({ ...props.userState, signUpError: "Password should only contain English characters" });
      }
      setSignUpFormState({ ...signUpFormState, logging: false });
    }
    else{
      API.createUser(signUpFormState).then(function (newUser) {
        if(newUser){
          const data = {
            to_email: newUser.email,
            verify_url: `${process.env.REACT_APP_VERIFY_BASE}${newUser.id}/${encodeURIComponent(newUser.password)}`
          } 
          setSignUpFormState({ email: "", password: "", logging: false });
          props.setUserState({ ...props.userState, signUpError: "" });
          setSignUpConfirmState({ ...signUpConfirmState, email: newUser.email });
  
          emailjs.send(process.env.REACT_APP_EMAIL_SERVICE, process.env.REACT_APP_EMAIL_VERIFICATION_TEMPLATE, data, process.env.REACT_APP_EMAIL_USER)
          .then(function(response) {
            setSignUpConfirmState({ ...signUpConfirmState, message: `SUCCESS! Your account has been created. You should receive a verification email with a URL link at : ${newUser.email}`, visible: true, success: true});
            // console.log('SUCCESS!', response.status, response.text);
          }, function(error) {
            setSignUpConfirmState({ ...signUpConfirmState, email: newUser.email, message: `Your account has been created, but something went wrong with the verification.`, visible: true, success: false});
            // console.log('FAILED...', error);
          });
        }
        else{
          //signUp failed
          props.setUserState({ ...props.userState, signUpError: "Sign Up failed" });
          setSignUpFormState({ ...signUpFormState, logging: false });
        }
      });
    }
    
  }

  function handleClose() {
    setSignUpConfirmState({ email: "", message: "", visible: false, success: false, created: true });
  }

  return (
    <div>
      {signUpConfirmState.visible === true
                ?
                <Modal show={signUpConfirmState.visible} onHide={handleClose} centered>
                    <Modal.Body className={signUpConfirmState.success === true ? "bg-success error-message" : "bg-danger error-message"}>
                        <p className="pop-up-text"> {signUpConfirmState.message}</p>
                        <Button variant="primary" onClick={handleClose} style={{ margin: "10px" }}>
                            OK
                        </Button>
                    </Modal.Body>
                </Modal>
                : null
            }
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
                {signUpFormState.logging === false
                  ? <button className="btn btn-lg btn-primary btn-block" type="submit">Create Account</button>
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