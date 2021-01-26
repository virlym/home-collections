import React, { useState } from "react";
import "./bookSearch.css";
import API from "../../utils/BookAPI.js";
import Searchbar from "../../components/searchbar/searchbar.js";
import BookSearchResults from "../../components/bookSearchResults/bookSearchResults.js";
import NoSearchResults from "../../components/noSearchResults.js";
import Searching from "../../components/searching.js";

function BookSearch(props) {
  const [searchState, setSearchState] = useState({
    searchTerm: "",
    searchType: "all",
    searchResults: [],
    searching: false
    // {id, title, subtitle, authors, cover, publisher, published, owned (T/F)}
  });

  function getAllSearch(results, index, rawResults) {
    if(searchState.searchType === "title"){
      API.titleSearch(searchState.searchTerm, index)
        .then(function (res){
          if(res.data.totalItems > 0){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.items);
            }
            else{
              rawResults = res.data.items;
            }
            if(res.data.items !== undefined){
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if((results < parseInt(res.data.totalItems)) && ( res.data.totalItems / 40 > 1 ) && (res.data.items !== undefined)){
              getAllSearch(results, index, rawResults);
            }
            else{
              sortResults(rawResults);
            }
          }
          else{
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else if(searchState.searchType === "author"){
      API.authorSearch(searchState.searchTerm, index)
        .then(function (res){
          setSearchState({ ...searchState, searching: true });
          if(res.data.totalItems > 0){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.items);
            }
            else{
              rawResults = res.data.items;
            }
            if(res.data.items !== undefined){
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if((results < parseInt(res.data.totalItems)) && ( res.data.totalItems / 40 > 1 ) && (res.data.items !== undefined)){
              getAllSearch(results, index, rawResults);
            }
            else{
              sortResults(rawResults);
            }
          }
          else{
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else if(searchState.searchType === "publisher"){
      API.publisherSearch(searchState.searchTerm, index)
        .then(function (res){
          setSearchState({ ...searchState, searching: true });
          if(res.data.totalItems > 0){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.items);
            }
            else{
              rawResults = res.data.items;
            }
            if(res.data.items !== undefined){
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if((results < parseInt(res.data.totalItems)) && ( res.data.totalItems / 40 > 1 ) && (res.data.items !== undefined)){
              getAllSearch(results, index, rawResults);
            }
            else{
              sortResults(rawResults);
            }
          }
          else{
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else if(searchState.searchType === "subject"){
      API.subjectSearch(searchState.searchTerm, index)
        .then(function (res){
          setSearchState({ ...searchState, searching: true });
          if(res.data.totalItems > 0){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.items);
            }
            else{
              rawResults = res.data.items;
            }
            if(res.data.items !== undefined){
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if((results < parseInt(res.data.totalItems)) && ( res.data.totalItems / 40 > 1 ) && (res.data.items !== undefined)){
              getAllSearch(results, index, rawResults);
            }
            else{
              sortResults(rawResults);
            }
          }
          else{
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else if(searchState.searchType === "isbn"){
      API.isbnSearch(searchState.searchTerm, index)
        .then(function (res){
          setSearchState({ ...searchState, searching: true });
          if(res.data.totalItems > 0){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.items);
            }
            else{
              rawResults = res.data.items;
            }
            if(res.data.items !== undefined){
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if((results < parseInt(res.data.totalItems)) && ( res.data.totalItems / 40 > 1 ) && (res.data.items !== undefined)){
              getAllSearch(results, index, rawResults);
            }
            else{
              sortResults(rawResults);
            }
          }
          else{
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else{
      API.generalSearch(searchState.searchTerm, index)
        .then(function (res){
          setSearchState({ ...searchState, searching: true });
          if(res.data.totalItems > 0){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.items);
            }
            else{
              rawResults = res.data.items;
            }
            if(res.data.items !== undefined){
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if((results < parseInt(res.data.totalItems)) && ( res.data.totalItems / 40 > 1 ) && (res.data.items !== undefined)){
              getAllSearch(results, index, rawResults);
            }
            else{
              sortResults(rawResults);
            }
          }
          else{
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
  }

  function sortResults(rawResults){
    let bookList = [];
    rawResults = [...new Set(rawResults)];
            for(let i = 0; i < rawResults.length; i++){
              if(rawResults[i] !== undefined){
                let hasBook = false;
                for(let j = 0; j < props.userBooks.length; j++){
                  if(props.userBooks[j].id === rawResults[i].id){
                    hasBook = true;
                  }
                }
                let imgLink = "";
                if(rawResults[i].volumeInfo.imageLinks !== undefined){
                  imgLink = rawResults[i].volumeInfo.imageLinks.thumbnail;
                }
                else{
                  imgLink = "https://hrce.insigniails.com/Library/images/~imageCT459526.JPG"
                }
                bookList.push({id: rawResults[i].id, title: rawResults[i].volumeInfo.title, subtitle: rawResults[i].volumeInfo.subtitle, authors: rawResults[i].volumeInfo.authors, cover: imgLink, publisher: rawResults[i].volumeInfo.publisher, published: rawResults[i].volumeInfo.publishedDate, owned: hasBook});
            }
            }
            setSearchState({...searchState, searching: false, searchResults: bookList});
  }

  function searchBooks(event){
    event.preventDefault();
    let results = 0;
    let index = 0;
    let rawResults = [];
    setSearchState({ ...searchState, searching: true });
    getAllSearch(results, index, rawResults);
  }

  // track search field input
  function handleBookSearchInputChange(event){
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
              Book Search
            </h1>
          </div>
        </div>

        <Searchbar searchAPI={searchBooks} handleSearchInputChange={handleBookSearchInputChange} searchState={searchState} searchType="book"/>

        <br />

        <div className="row">
        <div className="col-12 border border-info rounded-top rounded-bottom display-box">
          <h3 className="section-head"> Search Results </h3>
          {searchState.searching === true
          ? <Searching />
          : searchState.searchResults.length > 0
            ? searchState.searchResults.map(function(searchArray){
              return <BookSearchResults searchResults={searchArray} key={searchArray.id} addToCollection={addToCollection} loggedIn={props.loggedIn}/>})
            : <NoSearchResults />
          }
        </div>
        </div>
      </div>
  );
}

export default BookSearch;