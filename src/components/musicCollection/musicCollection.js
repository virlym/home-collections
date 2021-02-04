import React from "react";
import "./musicCollection.css";
import API from "../../utils/API.js";

function MusicCollection(props) {

  function removeFromCollection() {
    API.removeMusic(props.userState.token, props.collection.id).then(function (delAlbum) {
      if (delAlbum) {
        API.getUserMusic(props.userState.token).then(function (userAlbums) {
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
        <div className="col-lg-4 col-md-12 my-auto">
          <img src={props.collection.album_art} alt={props.collection.album + "Cover"} className="album-size" />
        </div>
        <div className="col-lg-4 col-md-12 my-auto">
          <div className="row description-row">
            <div className="col-12">
              <p> {props.collection.album} <br />
                            ({props.collection.release.substring(0, 4)}) <br />
                {props.collection.artist}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 my-auto">
          <button onClick={function () { removeFromCollection() }}> Remove </button>
        </div>
      </div>
      <hr className="slate-hr" />
    </div>

  );
}

export default MusicCollection;