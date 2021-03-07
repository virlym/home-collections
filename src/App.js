import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from "./components/navTabs/navTabs.js";
import Landing from "./pages/landing/landing.js";
import Expired from "./pages/expired/expired.js";
import BookSearch from "./pages/bookSearch/bookSearch.js";
import MovieSearch from "./pages/movieSearch/movieSearch.js";
import MusicSearch from "./pages/musicSearch/musicSearch.js";
import UserMusic from "./pages/userMusic/userMusic.js";
import UserBooks from "./pages/userBooks/userBooks.js";
import UserMovies from "./pages/userMovies/userMovies.js";
import AccountVerification from "./pages/accountVerification/accountVerification.js";
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
    else if(window.location.pathname === "/expired"){
      setPageState({ currentPage: "expired" });
    }
    else if(window.location.pathname === "/verify"){
      setPageState({ currentPage: "verify" });
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
    let bookResults = [];
    let movieResults = [];
    let musicResults = [];
    API.getUserBooks(token).then(function (userBooks) {
      if (userBooks) {
        bookResults = [ ...userBooks ];
      }
      API.getUserMovies(token).then(function (userMovies) {
        if (userMovies) {
          movieResults = [ ...userMovies ];
        }
        API.getUserMusic(token).then(function (userAlbums) {
          if (userAlbums) {
            musicResults = [ ...userAlbums ];
          }
          setUserState({ ...userState, books: bookResults, movies: movieResults, albums: musicResults });
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
        <Route path="/movies"> <MovieSearch userMovies={userState.movies} loggedIn={userState.isLoggedIn} token={userState.token} setUserState={setUserState} userState={userState} /> </Route>
        <Route path="/music"> <MusicSearch userAlbums={userState.albums} loggedIn={userState.isLoggedIn} token={userState.token} setUserState={setUserState} userState={userState} /> </Route>
        <Route path="/mybooks"> <UserBooks userState={userState} setUserState={setUserState} /> </Route>
        <Route path="/mymovies"> <UserMovies userState={userState} setUserState={setUserState} /> </Route>
        <Route path="/mymusic"> <UserMusic userState={userState} setUserState={setUserState} /> </Route>
        <Route path="/login"> <Login setPageState={setPageState} setUserState={setUserState} userState={userState} fillProfile={fillProfile}/> </Route>
        <Route path="/signup"> <Signup setPageState={setPageState} setUserState={setUserState} userState={userState} fillProfile={fillProfile}/> </Route>
        <Route path="/expired"> <Expired setUserState={setUserState} userState={userState} /> </Route>
        <Route path="/verify"> <AccountVerification setPageState={setPageState} /> </Route>
        <Route path="/landing"> <Landing setPageState={setPageState} /> </Route>
        <Route exact path="/"> <Landing setPageState={setPageState} /> </Route>
        <Route path="*"> <Landing setPageState={setPageState} /> </Route>

      </Switch>
      </Router>
      <footer>
        <small> &copy; 2020 Virlym di Aunel</small>
      </footer>
    </div>
  );
}

export default App;
