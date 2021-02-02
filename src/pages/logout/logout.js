import React, { useEffect } from "react";
import { Modal, Spinner } from 'react-bootstrap';
import "./logout.css";

function Logout(props) {

  useEffect(function () {
    if(props.loggingOutState === true){
      localStorage.clear();
      props.fetchUserData();
      if(props.userState.isLoggedIn === false){
        props.setLoggingOutState( false );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loggingOutState, props.userState.isLoggedIn]);

  return (
    <Modal show={props.loggingOutState} centered className="center-text">
      <Modal.Body className="bg-info success-message">
        Thank you for using Home Collections
        <br />
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        <br />
        Please wait while you are logged out
      </Modal.Body>
    </Modal>
  );
}

export default Logout;