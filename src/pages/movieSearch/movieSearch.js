import React, { useState } from "react";
import "./movieSearch.css";
import API from "../../utils/MovieAPI.js";
import Searchbar from "../../components/searchbar/searchbar.js"

function MovieSearch() {
  const [searchState, setSearchState] = useState({
    searchTerm: "",
    searchType: "",
    searchResults: []
    // {id, title, year, poster, nominated (T/F)}
  });

    // user nominations
    const [nominationState, setNominationState] = useState({
      nominations: []
      // {id, title, year, poster}
    });

  function testOutput (data) {
    console.log(data);
  }

  function searchMovies(event){
    event.preventDefault();
    console.log("hi");
    console.log(searchState.searchTerm);
    console.log(searchState.searchType);
    // API.search(searchState.searchTerm)
    //     .then(function (res){
    //       if(res.data.Response === "True"){
    //         console.log(res.data);
    //         let movieList = [];
    //         for(let i = 0; i < res.data.Search.length; i++){
    //           if(res.data.Search[i].Type === "movie"){
    //             let isNominated = false;
    //             for(let j = 0; j < nominationState.nominations.length; j++){
    //               if(nominationState.nominations[j].id === res.data.Search[i].imdbID){
    //                 isNominated = true;
    //               }
    //             }
    //             let imgLink = res.data.Search[i].Poster;
    //             if(imgLink === "N/A"){
    //               imgLink = "https://123moviesfree.zone/no-poster.png"
    //             }
    //             movieList.push({id: res.data.Search[i].imdbID, title: res.data.Search[i].Title, year: res.data.Search[i].Year, poster: imgLink, nominated: isNominated});
    //           }
    //         }
    //         setSearchState({...searchState, searchResults: movieList});
    //       }
    //     })
    //     .catch(err => console.log("error :", err));
  }

  // track search field input
  function handleMovieSearchInputChange(event){
    const value = event.target.value;
    const name = event.target.name;
    setSearchState({...searchState, [name]: value});
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
          <div className="col-12">
            {/* <table id="myTable">
              <Table table={this.state.tableList.data} sort={this.sortTable.bind(this)}/>
            </table> */}
          </div>
        </div>
      </div>
  );
}

export default MovieSearch;