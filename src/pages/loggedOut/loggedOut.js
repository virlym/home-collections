import React from "react";
import "./loggedOut.css";

function LoggedOut(props) {

  return (
    <div className="logged-out-style">
      {props.userState.isLoggedIn === false
        ?
          <>
            <h1>You have successfully logged out.</h1>
            <br />
            <h2>Thank you for using Home Collections.</h2>
          </>
        :
          <>
            <h1>Thank you for using Home Collections.</h1>
          </>
      }
      
    </div>
  );
}

export default LoggedOut;