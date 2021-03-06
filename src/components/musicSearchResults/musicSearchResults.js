import React from "react";
import "./musicSearchResults.css";
import API from "../../utils/API.js";

function MusicSearchResults(props) {
    let artists = "";
    if(props.searchResults.artists){
        for(let i = 0; i < props.searchResults.artists.length; i++){
            if(i > 0){
                artists = artists + ", ";
            }
            artists = artists + props.searchResults.artists[i].name;
        }
    }

    function addToCollection(){
        const musicObj = {
            spotify_id: props.searchResults.id,
            album: props.searchResults.album,
            release: props.searchResults.release,
            album_art: props.searchResults.albumArt,
            artist: artists
        }
        API.collectMusic(props.token, musicObj).then(function (newAlbum) {
            if(newAlbum){
                API.getUserMusic(props.token).then(function (userAlbums) {
                    if (userAlbums) {
                      props.setUserState({ ...props.userState, albums: userAlbums });
                    }
                });
            }
        });
    }

    return (
        <div>
            <div className="row">
                <div className="col-4 my-auto">
                    <img src={props.searchResults.albumArt} alt={props.searchResults.album + "Cover"} className="album-size"/>
                </div>
                <div className="col-8">
                    <div className="row description-row">
                        <div className="col-12">
                            <p> {props.searchResults.album} <br /> 
                            ({props.searchResults.release.substring(0, 4)}) <br /> 
                            {artists}</p>
                        </div>
                    </div>
                    {props.loggedIn === true
                    ?
                        <>
                        <br />
                        <div className="row">
                            <div className="col-12">
                                {props.searchResults.owned === false
                                    ? <button onClick={function(){addToCollection()}}> Add to Collection </button>
                                    : <button disabled> Already Owned </button>
                                }
                            </div>
                        </div>
                        </>
                    :  <>
                    <br />
                    <div className="row">
                        <div className="col-12">
                            <button disabled> Sign in to collect </button>
                        </div>
                    </div>
                    </>
                    }
                </div>
            </div>
            <hr className="slate-hr"/>
        </div>

    );
}

export default MusicSearchResults;