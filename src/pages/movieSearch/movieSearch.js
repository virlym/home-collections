import React, { useState } from "react";
import "./movieSearch.css";
import API from "../../utils/MovieAPI.js";
import Searchbar from "../../components/searchbar/searchbar.js"
import SearchResults from "../../components/searchResults/searchResults.js"
import NoSearchResults from "../../components/noSearchResults.js"

function MovieSearch(props) {
  const [searchState, setSearchState] = useState({
    searchTerm: "",
    searchType: "all",
    searchResults: []
    // {id, title, year, poster, owned (T/F)}
  });

  function getAllSearch(results, page, rawResults) {
    API.search(searchState.searchTerm, page)
        .then(function (res){
          if(res.data.Response === "True"){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.Search);
            }
            else{
              rawResults = res.data.Search;
            }
            results = parseInt(results) + parseInt(res.data.Search.length);
            page++;
            if(results < parseInt(res.data.totalResults)){
              getAllSearch(results, page, rawResults);
            }
            else{
              sortResults(rawResults);
            }
          }
        })
        .catch(err => console.log("error :", err));
  }

  function sortResults(rawResults){
    let movieList = [];
            for(let i = 0; i < rawResults.length; i++){
              if(searchState.searchType === "movies"){
                if(rawResults[i].Type === "movie"){
                  let hasMovie = false;
                  for(let j = 0; j < props.userMovies.length; j++){
                    if(props.userMovies[j].id === rawResults[i].imdbID){
                      hasMovie = true;
                    }
                  }
                  let imgLink = rawResults[i].Poster;
                  if(imgLink === "N/A"){
                    imgLink = "https://123moviesfree.zone/no-poster.png"
                  }
                  movieList.push({id: rawResults[i].imdbID, title: rawResults[i].Title, year: rawResults[i].Year, poster: imgLink, owned: hasMovie});
                }
              }

              else if(searchState.searchType === "series"){
                if(rawResults[i].Type === "series"){
                  let hasMovie = false;
                  for(let j = 0; j < props.userMovies.length; j++){
                    if(props.userMovies[j].id === rawResults[i].imdbID){
                      hasMovie = true;
                    }
                  }
                  let imgLink = rawResults[i].Poster;
                  if(imgLink === "N/A"){
                    imgLink = "https://123moviesfree.zone/no-poster.png"
                  }
                  movieList.push({id: rawResults[i].imdbID, title: rawResults[i].Title, year: rawResults[i].Year, poster: imgLink, owned: hasMovie});
                }
              }

              else{
                if((rawResults[i].Type === "movie")||(rawResults[i].Type === "series")){
                  let hasMovie = false;
                  for(let j = 0; j < props.userMovies.length; j++){
                    if(props.userMovies[j].id === rawResults[i].imdbID){
                      hasMovie = true;
                    }
                  }
                  let imgLink = rawResults[i].Poster;
                  if(imgLink === "N/A"){
                    imgLink = "https://123moviesfree.zone/no-poster.png"
                  }
                  movieList.push({id: rawResults[i].imdbID, title: rawResults[i].Title, year: rawResults[i].Year, poster: imgLink, owned: hasMovie});
                }
              }

            }
            setSearchState({...searchState, searchResults: movieList});
  }

  function searchMovies(event){
    event.preventDefault();
    let results = 0;
    let page = 1;
    let rawResults = [];
    getAllSearch(results, page, rawResults);
  }

  // track search field input
  function handleMovieSearchInputChange(event){
    const value = event.target.value;
    const name = event.target.name;
    setSearchState({...searchState, [name]: value});
  }

  function addToCollection(){

  }

  return (
    <div className="container">

        <div className="row">
          <div className="col-12">
            <h1>
              Movie Search
            </h1>
          </div>
        </div>

        <Searchbar searchAPI={searchMovies} handleSearchInputChange={handleMovieSearchInputChange} searchState={searchState} searchType="movie"/>

        <br />

        <div className="row">
        <div className="col-12 border border-info rounded-top rounded-bottom display-box">
          <h3 className="section-head"> Search Results </h3>
          {searchState.searchResults.length > 0
            ? searchState.searchResults.map(function(searchArray){
              return <SearchResults searchResults={searchArray} key={searchArray.id} addToCollection={addToCollection} loggedIn={props.loggedIn}/>})
            : <NoSearchResults />
          }
        </div>
        </div>
      </div>
  );
}

export default MovieSearch;