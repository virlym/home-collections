import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from "./components/navTabs/navTabs";
import Landing from "./pages/landing/landing";
import BookSearch from "./pages/bookSearch/bookSearch";
import MovieSearch from "./pages/movieSearch/movieSearch";
import MusicSearch from "./pages/musicSearch/musicSearch";
import {Helmet} from 'react-helmet';

function App() {
  // state to keep track of the current page
  const [pageState, setPageState] = useState({
    currentPage: ""
  });

  const [userState, setUserState] = useState({
    loggedIn: false,
    books: [],
    movies: [],
    music: []
  });

  // on page load, get the current page
  useEffect(function () {
    if(window.location.pathname === "/books"){
      setPageState({ currentPage: "books" });
    }
    else if(window.location.pathname === "movies"){
      setPageState({ currentPage: "movies" });
    }
    else if(window.location.pathname === "music"){
      setPageState({ currentPage: "music" });
    }
    else{
      setPageState({ currentPage: "landing" });
    }
  }, []);

  return (
    <div>
      <Helmet>
        <body className="bg-dark text-light"/>
      </Helmet>
        <Router>
          <NavTabs currentPage={pageState.currentPage} setPageState={setPageState} loggedIn={userState.loggedIn}/>
        <Switch>
          <Route path="/books"> <BookSearch userBooks={userState.books} loggedIn={userState.loggedIn} /> </Route>
          <Route path="/movies"> <MovieSearch userMovies={userState.movies} loggedIn={userState.loggedIn} /> </Route>
          <Route path="/music"> <MusicSearch userMusic={userState.music} loggedIn={userState.loggedIn} /> </Route>
          <Route path="/profile"> <MusicSearch /> </Route>
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
