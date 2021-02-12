import React, { useState, useEffect } from "react";
import "./userMovies.css";
import FilterBar from "../../components/filterBar/filterBar.js";
import MovieCollection from "../../components/movieCollection/movieCollection.js"
import NoSearchResults from "../../components/noSearchResults.js";

function UserMovies(props) {
  const [filterState, setFilterState] = useState({
    filterTerm: "",
    filterResults: []
  });

  useEffect(function () {
    if (props.userState.movies) {
      filterCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userState, filterState.filterTerm]);

  function filterCollection() {
    const data = [...props.userState.movies];
    const newFilter = [];
    for (let i = 0; i < data.length; i++) {
      const term = `${data[i].title.toLocaleLowerCase()} ${data[i].year.substring(0, 4)}`;
      if ((filterState.filterTerm === "") || (term.indexOf(filterState.filterTerm.toLocaleLowerCase()) > -1)) {
        newFilter.push(props.userState.movies[i]);
      }
    }
    setFilterState({ ...filterState, filterResults: newFilter });
  }

  // track search field input
  function handleMovieFilterInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setFilterState({ ...filterState, [name]: value });
  }

  return (
    <div className="container">

      <div className="row">
        <div className="col-12">
          <h1>
            My Movies
            </h1>
        </div>
      </div>

      <FilterBar handleFilterInputChange={handleMovieFilterInputChange} filterState={filterState} setFilterState={setFilterState} />

      <br />

      <div className="row">
        <div className="col-12 border border-info rounded-top rounded-bottom display-box">
          <h3 className="section-head"> Collected Movies </h3>
          {filterState.filterResults.length > 0
            ? filterState.filterResults.map(function (movieArray) {
              return <MovieCollection collection={movieArray} key={movieArray.omdb_id} loggedIn={props.loggedIn} token={props.token} setUserState={props.setUserState} userState={props.userState} />
            })
            : <NoSearchResults />
          }
        </div>
      </div>
    </div>
  );
}

export default UserMovies;