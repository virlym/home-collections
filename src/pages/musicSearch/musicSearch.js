import React, { useState, useEffect } from "react";
import "./musicSearch.css";
import API from "../../utils/SpotifyAPI.js";
import Searchbar from "../../components/searchbar/searchbar.js";
import MusicSearchResults from "../../components/musicSearchResults/musicSearchResults.js";
import NoSearchResults from "../../components/noSearchResults.js";
import Searching from "../../components/searching.js";

function MusicSearch(props) {
  const [searchState, setSearchState] = useState({
    searchTerm: "",
    searchType: "artist",
    searchResults: [],
    searching: false
    // {id, artists, album, albumArt, release, owned (T/F)}
  });

  useEffect(function () {
    if(props.userAlbums){
      let updatedResults = [...searchState.searchResults];
      for(let i = 0; i < updatedResults.length; i++){
        for (let j = 0; j < props.userAlbums.length; j++) {
          if (props.userAlbums[j].spotify_id === updatedResults[i].id) {
            updatedResults[i].owned = true;
          }
        }
      }
      setSearchState({ ...searchState, searchResults: updatedResults });
    }
  }, [props.userState]);

  function getAllSearch(results, index, rawResults, token) {
    if(searchState.searchType === "artist"){
      API.artistSearch(searchState.searchTerm, token, index)
        .then(function (res){
          if(res.status === 200){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.albums.items);
            }
            else{
              rawResults = res.data.albums.items;
            }
            if(res.data.albums.items !== undefined){
              results = parseInt(results) + parseInt(res.data.albums.items.length);
            }
            index = index + 50;
            if((results < parseInt(res.data.albums.total)) && ( res.data.albums.total / 50 > 1 ) && (res.data.albums.items !== undefined) && (results < 550)){
              getAllSearch(results, index, rawResults, token);
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
    else if(searchState.searchType === "album"){
      API.albumSearch(searchState.searchTerm, token, index)
        .then(function (res){
          setSearchState({ ...searchState, searching: true });
          if(res.status === 200){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.albums.items);
            }
            else{
              rawResults = res.data.albums.items;
            }
            if(res.data.albums.items !== undefined){
              results = parseInt(results) + parseInt(res.data.albums.items.length);
            }
            index = index + 50;
            if((results < parseInt(res.data.albums.total)) && ( res.data.albums.total / 50 > 1 ) && (res.data.albums.items !== undefined) && (results < 550)){
              getAllSearch(results, index, rawResults, token);
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
      API.songSearch(searchState.searchTerm, token, index)
        .then(function (res){
          setSearchState({ ...searchState, searching: true });
          if(res.status === 200){
            if(rawResults.length > 0){
              rawResults = rawResults.concat(res.data.tracks.items);
            }
            else{
              rawResults = res.data.tracks.items;
            }
            if(res.data.tracks.items !== undefined){
              results = parseInt(results) + parseInt(res.data.tracks.items.length);
            }
            index = index + 50;
            if((results < parseInt(res.data.tracks.total)) && ( res.data.tracks.total / 50 > 1 ) && (res.data.tracks.items !== undefined) && (results < 550)){
              getAllSearch(results, index, rawResults, token);
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
    let albumList = [];
    if((searchState.searchType === "artist")||(searchState.searchType === "album")){
      for(let i = 0; i < rawResults.length; i++){
        if(rawResults[i] !== undefined){
          let imgLink = "";
          if(rawResults[i].images !== undefined){
            imgLink = rawResults[i].images[0].url;
          }
          else{
            imgLink = "https://i.dlpng.com/static/png/6331252_preview.png"
          }
          albumList.push({id: rawResults[i].id, artists: rawResults[i].artists, album: rawResults[i].name, albumArt: imgLink, release: rawResults[i].release_date, owned: false});
        }
      }
      let uniqueAlbumList = Array.from(new Set(albumList.map(function(data){ 
        return data.id 
      })))
      .map(function(id){ 
        return albumList.find(function (data){ 
          return data.id === id
        })
      });
      setSearchState({...searchState, searching: false, searchResults: uniqueAlbumList});
    }
    else{
      for(let i = 0; i < rawResults.length; i++){
        if(rawResults[i] !== undefined){
          let imgLink = "";
          if(rawResults[i].album.images !== undefined){
            imgLink = rawResults[i].album.images[0].url;
          }
          else{
            imgLink = "https://hrce.insigniails.com/Library/images/~imageCT459526.JPG"
          }
          albumList.push({id: rawResults[i].album.id, artists: rawResults[i].album.artists, album: rawResults[i].album.name, albumArt: imgLink, release: rawResults[i].album.release_date, owned: false});
        }
      }
      let uniqueAlbumList = Array.from(new Set(albumList.map(function(data){ 
        return data.id 
      })))
      .map(function(id){ 
        return albumList.find(function (data){ 
          return data.id === id
        })
      });

      for(let i = 0; i < uniqueAlbumList.length; i++){
        for (let j = 0; j < props.userAlbums.length; j++) {
          if (props.userAlbums[j].spotify_id === uniqueAlbumList[i].id) {
            uniqueAlbumList[i].owned = true;
          }
        }
      }

      setSearchState({...searchState, searching: false, searchResults: uniqueAlbumList});
    }   
  }

  function searchMusic(event){
    event.preventDefault();
    let results = 0;
    let index = 0;
    let rawResults = [];
    setSearchState({ ...searchState, searching: true });
    API.getToken()
    .then(function(res){
      const token = `${res.data.token_type} ${res.data.access_token}`;
      getAllSearch(results, index, rawResults, token);
    })
    .catch(function(err){
      console.log("error : ", err)
    });
  }

  // track search field input
  function handleMusicSearchInputChange(event){
    const value = event.target.value;
    const name = event.target.name;
    setSearchState({...searchState, [name]: value});
  }

  return (
    <div className="container">

        <div className="row">
          <div className="col-12">
            <h1>
              Album Search
            </h1>
          </div>
        </div>

        <Searchbar searchAPI={searchMusic} handleSearchInputChange={handleMusicSearchInputChange} searchState={searchState} searchType="music"/>

        <br />

        <div className="row">
        <div className="col-12 border border-info rounded-top rounded-bottom display-box">
          <h3 className="section-head"> Search Results </h3>
          {searchState.searching === true
          ? <Searching />
          : searchState.searchResults.length > 0
            ? searchState.searchResults.map(function(searchArray){
              return <MusicSearchResults searchResults={searchArray} key={searchArray.id} loggedIn={props.loggedIn} token={props.token} setUserState={props.setUserState} userState={props.userState} />})
            : <NoSearchResults />
          }
        </div>
        </div>
      </div>
  );
}

export default MusicSearch;