import React, { useEffect }from "react";
import "./loggedOut.css";

function LoggedOut(props) {

  useEffect(function () {
    if(props.userState){
      if(props.userState.isLoggedIn === true){
        localStorage.clear();
        props.setUserState({
          email: "",
          token: "",
          id: "",
          isLoggedIn: false,
          loginError: "",
          signUpError: "",
          books: [],
          movies: [],
          albums: []
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userState.isLoggedIn]);

  return (
    <div className="logged-out-style">
      <h1>You have successfully logged out.</h1>
      <br />
      <h2>Thank you for using Home Collections.</h2>
    </div>
  );
}

export default LoggedOut;