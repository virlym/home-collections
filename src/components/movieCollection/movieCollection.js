import React from "react";
import "./movieCollection.css";
import API from "../../utils/API.js";

function MovieCollection(props) {

  function removeFromCollection() {
    API.removeMovie(props.userState.token, props.collection.id).then(function (delMovie) {
      if (delMovie) {
        API.getUserMovies(props.userState.token).then(function (userMovies) {
          if (userMovies) {
            props.setUserState({ ...props.userState, movies: userMovies });
          }
        });
      }
    });
  }

  function dvdCheckChange(event) {
    let value = false;
    if(event.target.value === "false"){
      value = true
    }
    const comment = props.collection.comments || "";
    let data = { dvd: value, blue_ray: props.collection.blue_ray, comments: comment }
    API.editMovie(props.userState.token, props.collection.id, data).then(function (editMovie) {
      if (editMovie) {
        API.getUserMovies(props.userState.token).then(function (userMovies) {
          if (userMovies) {
            props.setUserState({ ...props.userState, movies: userMovies });
          }
        });
      }
    });
  }

  function blueRayCheckChange(event) {
    let value = false;
    if(event.target.value === "false"){
      value = true
    }
    const comment = props.collection.comments || "";
    let data = { dvd: props.collection.dvd, blue_ray: value, comments: comment }
    API.editMovie(props.userState.token, props.collection.id, data).then(function (editMovie) {
      if (editMovie) {
        API.getUserMovies(props.userState.token).then(function (userMovies) {
          if (userMovies) {
            props.setUserState({ ...props.userState, movies: userMovies });
          }
        });
      }
    });
  }

  function commentsChange(comment) {
    let data = { dvd: props.collection.dvd, blue_ray: props.collection.blue_ray, comments: comment }
    API.editMovie(props.userState.token, props.collection.id, data).then(function (editMovie) {
      if (editMovie) {
        API.getUserMovies(props.userState.token).then(function (userMovies) {
          if (userMovies) {
            props.setUserState({ ...props.userState, movies: userMovies });
          }
        });
      }
    });
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-12 my-auto">
          <img src={props.collection.poster} alt={props.collection.title + "Poster"} className="poster-size" />
        </div>
        <div className="col-lg-4 col-md-12 my-auto">
          <div className="row description-row">
            <div className="col-12">
              <p> 
                {props.collection.title} ({props.collection.year}) <br />
              </p>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="dvdCheckBox" value={props.collection.dvd} name="dvd" onChange={dvdCheckChange} checked={props.collection.dvd} />
                <label className="form-check-label"> DVD </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="blueRayCheckBox" value={props.collection.blue_ray} name="blue_ray" onChange={blueRayCheckChange} checked={props.collection.blue_ray} />
                <label className="form-check-label"> Blu-ray</label>
              </div>
              <br /> <br />
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

export default MovieCollection;