import React from "react";
import { Link } from "react-router-dom";

function NavTabs(props) {

  return (
    <ul className="nav nav-tabs navbar-dark bg-info">
      <Link to="/landing" onClick={function(){ props.setPageState({currentPage: "landing"})}} className="navbar-brand" >
        Home Collections
      </Link>
      <li className="nav-item">
        <Link to="/landing" onClick={function(){ props.setPageState({currentPage: "landing"})}} className={props.currentPage === "landing" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/books" onClick={function(){ props.setPageState({currentPage: "books"})}} className={props.currentPage === "books" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
          Books
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/movies" onClick={function(){ props.setPageState({currentPage: "movies"})}} className={props.currentPage === "movies" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
          Movies
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/music" onClick={function(){ props.setPageState({currentPage: "music"})}} className={props.currentPage === "music" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
          Music
        </Link>
      </li>
      { props.loggedIn === true
      ?
        <li className="nav-item">
          <Link to="/profile" onClick={function(){ props.setPageState({currentPage: "profile"})}} className={props.currentPage === "profile" ? "nav-link active bg-dark text-light" : props.currentPage === "mybooks" ? "nav-link active bg-dark text-light" : props.currentPage === "mymovies" ? "nav-link active bg-dark text-light" : props.currentPage === "mymusic" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
            My Collections
          </Link>
        </li>
      :
        null
      }
      <li className="nav-item ml-auto">
        {props.loggedIn === false
          ?
            <Link to="/login" onClick={function(){ props.setPageState({currentPage: "login"})}} className={props.currentPage === "login" ? "nav-link active bg-dark text-light" : props.currentPage === "signup" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
              Login
            </Link>
          :
            <Link to="/logout" onClick={function(){ props.setPageState({currentPage: "logout"})}} className={props.currentPage === "logout" ? "nav-link active bg-dark text-light" : "nav-link text-light"}>
              Logout
            </Link>
        }
      </li>
    </ul>
  );
}

export default NavTabs;