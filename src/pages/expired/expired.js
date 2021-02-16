import React, { useEffect }from "react";
import { useHistory } from 'react-router-dom';
import "./expired.css";

function Expired(props) {
  let history = useHistory();

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
    <div className="expired-style">
      <h1>Your session has expired.</h1>
      <br />
      <h2> Please login again.</h2>
    </div>
  );
}

export default Expired;