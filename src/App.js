import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavTabs from "./components/navTabs/navTabs";
import Landing from "./pages/landing/landing";
import BookSearch from "./pages/bookSearch/bookSearch";
import MovieSearch from "./pages/movieSearch/movieSearch";
import MusicSearch from "./pages/musicSearch/musicSearch";

function App() {
  // state to keep track of the current page
  const [pageState, setPageState] = useState({
    currentPage: ""
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
        <Router>
          <NavTabs currentPage={pageState.currentPage} setPageState={setPageState}/>
        <Switch>
          <Route path="/books"> <BookSearch/> </Route>
          <Route path="/movies"> <MovieSearch /> </Route>
          <Route path="/music"> <MusicSearch /> </Route>
          <Route exact path="/"> <Landing /> </Route>
          <Route path="*"> <Landing /> </Route>

        </Switch>
        </Router>
      </div>
  );
}

export default App;
