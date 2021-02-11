import React, { useState, useEffect } from "react";
import "./userMusic.css";
import FilterBar from "../../components/filterBar/filterBar.js";
import MusicCollection from "../../components/musicCollection/musicCollection.js"
import NoSearchResults from "../../components/noSearchResults.js";

function UserMusic(props) {
  const [filterState, setFilterState] = useState({
    filterTerm: "",
    filterResults: []
  });

  useEffect(function () {
    if(props.userState.albums){
      filterCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userState, filterState.filterTerm]);

  function filterCollection(){
    const data = [...props.userState.albums];
    const newFilter = [];
    for (let i = 0; i < data.length; i++){
      const term = `${data[i].artist.toLocaleLowerCase()} ${data[i].album.toLocaleLowerCase()} ${data[i].release.substring(0, 4)}`;
      if((filterState.filterTerm === "") || (term.indexOf(filterState.filterTerm.toLocaleLowerCase()) > -1)){
        newFilter.push(props.userState.albums[i]);
      }
    }
    setFilterState({ ...filterState, filterResults: newFilter });
  }

  // track search field input
  function handleMusicFilterInputChange(event){
    const value = event.target.value;
    const name = event.target.name;
    setFilterState({...filterState, [name]: value});
  }

  return (
    <div className="container">

        <div className="row">
          <div className="col-12">
            <h1>
              My Music
            </h1>
          </div>
        </div>

        <FilterBar handleFilterInputChange={handleMusicFilterInputChange} filterState={filterState} setFilterState={setFilterState}/>

        <br />

        <div className="row">
        <div className="col-12 border border-info rounded-top rounded-bottom display-box">
          <h3 className="section-head"> Collected Albums </h3>
          {filterState.filterResults.length > 0
            ? filterState.filterResults.map(function(albumArray){
              return <MusicCollection collection={albumArray} key={albumArray.spotify_id} loggedIn={props.loggedIn} token={props.token} setUserState={props.setUserState} userState={props.userState} />})
            : <NoSearchResults />
          }
        </div>
        </div>
      </div>
  );
}

export default UserMusic;