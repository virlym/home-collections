import React, { useState, useEffect } from "react";
import "./userBooks.css";
import FilterBar from "../../components/filterBar/filterBar.js";
import BookCollection from "../../components/bookCollection/bookCollection.js"
import NoSearchResults from "../../components/noSearchResults.js";

function UserBooks(props) {
  const [filterState, setFilterState] = useState({
    filterTerm: "",
    filterResults: []
  });

  useEffect(function () {
    if (props.userState.books) {
      filterCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userState, filterState.filterTerm]);

  function filterCollection() {
    const data = [...props.userState.books];
    const newFilter = [];
    for (let i = 0; i < data.length; i++) {
      let sub = "";
      let published = "";
      if (data[i].subtitle) {
        sub = data[i].subtitle.toLocaleLowerCase();
      }
      if (data[i].published) {
        published = data[i].published.substring(0, 4);
      }
      const term = `${data[i].author.toLocaleLowerCase()} ${data[i].title.toLocaleLowerCase()} ${sub} ${published}`;
      if ((filterState.filterTerm === "") || (term.indexOf(filterState.filterTerm.toLocaleLowerCase()) > -1)) {
        newFilter.push(props.userState.books[i]);
      }
    }
    setFilterState({ ...filterState, filterResults: newFilter });
  }

  // track search field input
  function handleBookFilterInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setFilterState({ ...filterState, [name]: value });
  }

  return (
    <div className="container">

      <div className="row">
        <div className="col-12">
          <h1>
            My Books
            </h1>
        </div>
      </div>

      <FilterBar handleFilterInputChange={handleBookFilterInputChange} filterState={filterState} setFilterState={setFilterState} />

      <br />

      <div className="row">
        <div className="col-12 border border-info rounded-top rounded-bottom display-box">
          <h3 className="section-head"> Collected Books </h3>
          {filterState.filterResults.length > 0
            ? filterState.filterResults.map(function (bookArray) {
              return <BookCollection collection={bookArray} key={bookArray.google_id} loggedIn={props.loggedIn} token={props.token} setUserState={props.setUserState} userState={props.userState} />
            })
            : <NoSearchResults />
          }
        </div>
      </div>
    </div>
  );
}

export default UserBooks;