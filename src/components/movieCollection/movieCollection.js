import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import "./movieCollection.css";
import API from "../../utils/API.js";

function MovieCollection(props) {

  const [commentState, setCommentState] = useState({
    commentUpdate: "",
    modal: false
  });

  useEffect(function() {
    if(props.collection.comments){
      setCommentState({...commentState, commentUpdate: props.collection.comments});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.collection]);

  function handleClose(){
    setCommentState({...commentState, modal: false});
  }

  function openModal(){
    setCommentState({...commentState, modal: true});
  }

  function handleInputChange(event){
    const value = event.target.value;
    const name = event.target.name;
    setCommentState({ ...commentState, [name]: value });
  }

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
    if (event.target.value === "false") {
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
    if (event.target.value === "false") {
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

  function commentsChange() {
    let data = { dvd: props.collection.dvd, blue_ray: props.collection.blue_ray, comments: commentState.commentUpdate }
    API.editMovie(props.userState.token, props.collection.id, data).then(function (editMovie) {
      if (editMovie) {
        API.getUserMovies(props.userState.token).then(function (userMovies) {
          if (userMovies) {
            props.setUserState({ ...props.userState, movies: userMovies });
            handleClose();
          }
        });
      }
    });
  }

  return (
    <div>
      {commentState.modal === true
        ? 
          <Modal show={commentState.modal} onHide={handleClose} centered>
            <Modal.Body className="bg-dark error-message">
              <textarea 
                className="form-control" 
                rows="3" 
                value={commentState.commentUpdate || ""}
                name="commentUpdate"
                onChange={handleInputChange}
                type="text"
                placeholder="Comments"
              />
                <br />
                <Button variant="primary" onClick={commentsChange} style={{margin: "10px"}}>
                  Save
              </Button>
              <Button variant="danger" onClick={handleClose} style={{margin: "10px"}}>
                  Close
              </Button>
            </Modal.Body>
          </Modal>
        : null
      }
      <div className="row">
        <div className="col-lg-4 col-md-12 my-auto">
          <img src={props.collection.poster} alt={props.collection.title + "Poster"} className="poster-size" />
        </div>
        <div className="col-lg-4 col-md-12 my-auto">
          <div className="row description-row">
            <div className="col-12">
              <p>
                {props.collection.title} ({props.collection.year}) <br />
                {props.collection.comments
                  ?
                  <svg onClick={openModal} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                  :
                  <svg onClick={openModal} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  </svg>
                }
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