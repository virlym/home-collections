import React from "react";
import { Link } from "react-router-dom";

function NavTabs(props) {

  return (
    <ul className="nav nav-tabs">
      <Link to="/landing" onClick={function(){ props.setPageState({currentPage: "landing"})}} className="navbar-brand" >
        Home Collections
      </Link>
      <li className="nav-item">
        <Link to="/landing" onClick={function(){ props.setPageState({currentPage: "landing"})}} className={props.currentPage === "landing" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/books" onClick={function(){ props.setPageState({currentPage: "books"})}} className={props.currentPage === "books" ? "nav-link active" : "nav-link"}>
          Books
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/movies" onClick={function(){ props.setPageState({currentPage: "movies"})}} className={props.currentPage === "movies" ? "nav-link active" : "nav-link"}>
          Movies
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/music" onClick={function(){ props.setPageState({currentPage: "music"})}} className={props.currentPage === "music" ? "nav-link active" : "nav-link"}>
          Music
        </Link>
      </li>
    </ul>
  );
}

export default NavTabs;