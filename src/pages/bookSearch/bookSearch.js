import React, { useState, useEffect } from "react";
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

  useEffect(function () {
    if(props.userBooks){
      let updatedResults = [...searchState.searchResults];
      for(let i = 0; i < updatedResults.length; i++){
        for (let j = 0; j < props.userBooks.length; j++) {
          if (props.userBooks[j].google_id === updatedResults[i].id) {
            updatedResults[i].owned = true;
          }
        }
      }
      setSearchState({ ...searchState, searchResults: updatedResults });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userState]);

  function getAllSearch(results, index, rawResults) {
    if (searchState.searchType === "title") {
      API.titleSearch(searchState.searchTerm, index)
        .then(function (res) {
          if (res.data.totalItems > 0) {
            if (rawResults.length > 0) {
              rawResults = rawResults.concat(res.data.items);
            }
            else {
              rawResults = res.data.items;
            }
            if (res.data.items !== undefined) {
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if ((results < parseInt(res.data.totalItems)) && (res.data.totalItems / 40 > 1) && (res.data.items !== undefined)) {
              getAllSearch(results, index, rawResults);
            }
            else {
              sortResults(rawResults);
            }
          }
          else {
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else if (searchState.searchType === "author") {
      API.authorSearch(searchState.searchTerm, index)
        .then(function (res) {
          setSearchState({ ...searchState, searching: true });
          if (res.data.totalItems > 0) {
            if (rawResults.length > 0) {
              rawResults = rawResults.concat(res.data.items);
            }
            else {
              rawResults = res.data.items;
            }
            if (res.data.items !== undefined) {
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if ((results < parseInt(res.data.totalItems)) && (res.data.totalItems / 40 > 1) && (res.data.items !== undefined)) {
              getAllSearch(results, index, rawResults);
            }
            else {
              sortResults(rawResults);
            }
          }
          else {
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else if (searchState.searchType === "publisher") {
      API.publisherSearch(searchState.searchTerm, index)
        .then(function (res) {
          setSearchState({ ...searchState, searching: true });
          if (res.data.totalItems > 0) {
            if (rawResults.length > 0) {
              rawResults = rawResults.concat(res.data.items);
            }
            else {
              rawResults = res.data.items;
            }
            if (res.data.items !== undefined) {
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if ((results < parseInt(res.data.totalItems)) && (res.data.totalItems / 40 > 1) && (res.data.items !== undefined)) {
              getAllSearch(results, index, rawResults);
            }
            else {
              sortResults(rawResults);
            }
          }
          else {
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else if (searchState.searchType === "subject") {
      API.subjectSearch(searchState.searchTerm, index)
        .then(function (res) {
          setSearchState({ ...searchState, searching: true });
          if (res.data.totalItems > 0) {
            if (rawResults.length > 0) {
              rawResults = rawResults.concat(res.data.items);
            }
            else {
              rawResults = res.data.items;
            }
            if (res.data.items !== undefined) {
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if ((results < parseInt(res.data.totalItems)) && (res.data.totalItems / 40 > 1) && (res.data.items !== undefined)) {
              getAllSearch(results, index, rawResults);
            }
            else {
              sortResults(rawResults);
            }
          }
          else {
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else if (searchState.searchType === "isbn") {
      API.isbnSearch(searchState.searchTerm, index)
        .then(function (res) {
          setSearchState({ ...searchState, searching: true });
          if (res.data.totalItems > 0) {
            if (rawResults.length > 0) {
              rawResults = rawResults.concat(res.data.items);
            }
            else {
              rawResults = res.data.items;
            }
            if (res.data.items !== undefined) {
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if ((results < parseInt(res.data.totalItems)) && (res.data.totalItems / 40 > 1) && (res.data.items !== undefined)) {
              getAllSearch(results, index, rawResults);
            }
            else {
              sortResults(rawResults);
            }
          }
          else {
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
    else {
      API.generalSearch(searchState.searchTerm, index)
        .then(function (res) {
          setSearchState({ ...searchState, searching: true });
          if (res.data.totalItems > 0) {
            if (rawResults.length > 0) {
              rawResults = rawResults.concat(res.data.items);
            }
            else {
              rawResults = res.data.items;
            }
            if (res.data.items !== undefined) {
              results = parseInt(results) + parseInt(res.data.items.length);
            }
            index = index + 40;
            if ((results < parseInt(res.data.totalItems)) && (res.data.totalItems / 40 > 1) && (res.data.items !== undefined)) {
              getAllSearch(results, index, rawResults);
            }
            else {
              sortResults(rawResults);
            }
          }
          else {
            setSearchState({ ...searchState, searching: false, searchResults: [] });
          }
        })
        .catch(err => console.log("error :", err));
    }
  }

  function sortResults(rawResults) {
    let bookList = [];
    rawResults = [...new Set(rawResults)];
    for (let i = 0; i < rawResults.length; i++) {
      if (rawResults[i] !== undefined) {
        let imgLink = "";
        if (rawResults[i].volumeInfo.imageLinks !== undefined) {
          imgLink = rawResults[i].volumeInfo.imageLinks.thumbnail;
        }
        else {
          imgLink = "https://hrce.insigniails.com/Library/images/~imageCT459526.JPG"
        }
        bookList.push({ id: rawResults[i].id, title: rawResults[i].volumeInfo.title, subtitle: rawResults[i].volumeInfo.subtitle, authors: rawResults[i].volumeInfo.authors, cover: imgLink, publisher: rawResults[i].volumeInfo.publisher, published: rawResults[i].volumeInfo.publishedDate, owned: false });
      }
    }
    let uniqueBookList = Array.from(new Set(bookList.map(function (data) {
      return data.id
    })))
      .map(function (id) {
        return bookList.find(function (data) {
          return data.id === id
        })
      });
      
      for(let i = 0; i < uniqueBookList.length; i++){
        for (let j = 0; j < props.userBooks.length; j++) {
          if (props.userBooks[j].google_id === uniqueBookList[i].id) {
            uniqueBookList[i].owned = true;
          }
        }
      }

    setSearchState({ ...searchState, searching: false, searchResults: uniqueBookList });
  }

  function searchBooks(event) {
    event.preventDefault();
    let results = 0;
    let index = 0;
    let rawResults = [];
    setSearchState({ ...searchState, searching: true });
    getAllSearch(results, index, rawResults);
  }

  // track search field input
  function handleBookSearchInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setSearchState({ ...searchState, [name]: value });
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

      <Searchbar searchAPI={searchBooks} handleSearchInputChange={handleBookSearchInputChange} searchState={searchState} searchType="book" />

      <br />

      <div className="row">
        <div className="col-12 border border-info rounded-top rounded-bottom display-box">
          <h3 className="section-head"> Search Results </h3>
          {searchState.searching === true
            ? <Searching />
            : searchState.searchResults.length > 0
              ? searchState.searchResults.map(function (searchArray) {
                return <BookSearchResults searchResults={searchArray} key={searchArray.id} loggedIn={props.loggedIn} token={props.token} setUserState={props.setUserState} userState={props.userState}/>
              })
              : <NoSearchResults />
          }
        </div>
      </div>
    </div>
  );
}

export default BookSearch;