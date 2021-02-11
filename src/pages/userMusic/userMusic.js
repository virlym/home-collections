import React, { useState, useEffect } from "react";
import "./userMusic.css";
import API from "../../utils/SpotifyAPI.js";
import FilterBar from "../../components/filterBar/filterBar.js";
import MusicCollection from "../../components/musicCollection/musicCollection.js"
import NoSearchResults from "../../components/noSearchResults.js";
import Searching from "../../components/searching.js";

function UserMusic(props) {
  const [filterState, setFilterState] = useState({
    filterTerm: "",
    filterType: "artist",
    filterResults: [],
    filtering: false
    // {id, artists, album, albumArt, release, owned (T/F)}
  });

  useEffect(function () {
    if(props.userAlbums){
      let updatedResults = [...filterState.filterResults];
      for(let i = 0; i < updatedResults.length; i++){
        for (let j = 0; j < props.userAlbums.length; j++) {
          if (props.userAlbums[j].spotify_id === updatedResults[i].id) {
            updatedResults[i].owned = true;
          }
        }
      }
      setFilterState({ ...filterState, filterResults: updatedResults });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userState]);

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

        <FilterBar handleFilterInputChange={handleMusicFilterInputChange} filterState={filterState}/>

        <br />

        <div className="row">
        <div className="col-12 border border-info rounded-top rounded-bottom display-box">
          <h3 className="section-head"> Collected Albums </h3>
          {filterState.searching === true
          ? <Searching />
          : props.userState.albums.length > 0
            ? props.userState.albums.map(function(albumArray){
              return <MusicCollection collection={albumArray} key={albumArray.spotify_id} loggedIn={props.loggedIn} token={props.token} setUserState={props.setUserState} userState={props.userState} />})
            : <NoSearchResults />
          }
        </div>
        </div>
      </div>
  );
}

export default UserMusic;