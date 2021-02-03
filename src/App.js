import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from "./components/navTabs/navTabs.js";
import Landing from "./pages/landing/landing.js";
import BookSearch from "./pages/bookSearch/bookSearch.js";
import MovieSearch from "./pages/movieSearch/movieSearch.js";
import MusicSearch from "./pages/musicSearch/musicSearch.js";
import Login from "./pages/login/login.js";
import Signup from "./pages/signup/signup.js";
import Logout from "./pages/logout/logout.js";
import {Helmet} from 'react-helmet';
import API from "./utils/API.js";

function App() {
  // state to keep track of the current page
  const [pageState, setPageState] = useState({
    currentPage: ""
  });

  const [loggingOutState, setLoggingOutState] = useState(false);

  const [userState, setUserState] = useState({
    isLoggedIn: false,
    books: [],
    movies: [],
    albums: []
  });

  // on page load, get the current page
  useEffect(function () {
    if(window.location.pathname === "/books"){
      setPageState({ currentPage: "books" });
    }
    else if(window.location.pathname === "/movies"){
      setPageState({ currentPage: "movies" });
    }
    else if(window.location.pathname === "/music"){
      setPageState({ currentPage: "music" });
    }
    else if(window.location.pathname === "/mybooks"){
      setPageState({ currentPage: "mybooks" });
    }
    else if(window.location.pathname === "/mymovies"){
      setPageState({ currentPage: "mymovies" });
    }
    else if(window.location.pathname === "/mymusic"){
      setPageState({ currentPage: "mymusic" });
    }
    else if(window.location.pathname === "/login"){
      setPageState({ currentPage: "login" });
    }
    else if(window.location.pathname === "/signup"){
      setPageState({ currentPage: "signup" });
    }
    else{
      setPageState({ currentPage: "landing" });
    }
    fetchUserData();
    if(userState.isLoggedIn){
      fillProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.isLoggedIn]);

  function fetchUserData() {
    const token = localStorage.getItem("token");
    if(!token){
      setUserState({
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
    else{
      API.getProfile(token).then(function (profileData) {
        if (profileData) {
          setUserState({
            email: profileData.email,
            token: token,
            id: profileData.id,
            isLoggedIn: true,
            loginError: "",
            signUpError: "",
            books: [],
            movies: [],
            albums: []
          });
        }
        else {
          localStorage.removeItem("token");
          setUserState({
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
      });
    }
  }

  function fillProfile() {
    const token = localStorage.getItem("token");
    API.getUserBooks(token).then(function (userBooks) {
      if (userBooks) {
        setUserState({ ...userState, books: userBooks });
      }
      API.getUserMovies(token).then(function (userMovies) {
        if (userMovies) {
          setUserState({ ...userState, movies: userMovies });
        }
        API.getUserMusic(token).then(function (userAlbums) {
          if (userAlbums) {
            setUserState({ ...userState, albums: userAlbums });
          }
        });
      });
    });
  }

  return (
    <div>
      <Helmet>
        <body className="bg-dark text-light"/>
      </Helmet>
      {loggingOutState === true
        ? <Logout userState={userState} loggingOutState={loggingOutState} setLoggingOutState={setLoggingOutState} fetchUserData={fetchUserData}/>
        : null
      }
      <Router>
        <NavTabs currentPage={pageState.currentPage} setPageState={setPageState} loggedIn={userState.isLoggedIn} userState={userState} loggingOutState={loggingOutState} setLoggingOutState={setLoggingOutState}/>
      <Switch>
        <Route path="/books"> <BookSearch userBooks={userState.books} loggedIn={userState.isLoggedIn} token={userState.token} setUserState={setUserState} userState={userState}/> </Route>
        <Route path="/movies"> <MovieSearch userMovies={userState.movies} loggedIn={userState.isLoggedIn} /> </Route>
        <Route path="/music"> <MusicSearch userAlbums={userState.albums} loggedIn={userState.isLoggedIn} /> </Route>
        <Route path="/mybooks"> <MusicSearch /> </Route>
        <Route path="/mymovies"> <MusicSearch /> </Route>
        <Route path="/mymusic"> <MusicSearch /> </Route>
        <Route path="/login"> <Login setPageState={setPageState} setUserState={setUserState} userState={userState} fillProfile={fillProfile}/> </Route>
        <Route path="/signup"> <Signup setPageState={setPageState} setUserState={setUserState} userState={userState} fillProfile={fillProfile}/> </Route>
        <Route exact path="/"> <Landing /> </Route>
        <Route path="*"> <Landing /> </Route>

      </Switch>
      </Router>
      <footer>
        <small> &copy; 2020 Virlym di Aunel</small>
      </footer>
    </div>
  );
}

export default App;
