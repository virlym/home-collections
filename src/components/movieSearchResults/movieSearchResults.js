import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import "./movieSearchResults.css";
import API from "../../utils/API.js";

function SearchResults(props) {
    const [commentState, setCommentState] = useState({
        comment: "",
        modal: false,
        dvd: false,
        blue_ray: false
    });

    function addToCollection() {
        const movieObj = {
            omdb_id: props.searchResults.id,
            title: props.searchResults.title,
            year: props.searchResults.year,
            poster: props.searchResults.poster,
            comment: commentState.comment,
            dvd: commentState.dvd,
            blue_ray: commentState.blue_ray
        }
        API.collectMovie(props.token, movieObj).then(function (newMovie) {
            if (newMovie) {
                API.getUserMovies(props.token).then(function (userMovies) {
                    if (userMovies) {
                        props.setUserState({ ...props.userState, movies: userMovies });
                    }
                });
            }
        });
    }

    function handleClose() {
        setCommentState({ ...commentState, modal: false });
    }

    function openModal() {
        setCommentState({ ...commentState, modal: true });
    }

    function handleCommentChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        setCommentState({ ...commentState, [name]: value });
    }

    function handleCheckChange(event) {
        console.log("check");
        let value = false;
        if (event.target.value === "false") {
            value = true
        }
        const name = event.target.name;
        setCommentState({ ...commentState, [name]: value });
    }

    return (
        <div>
            {commentState.modal === true
                ?
                <Modal show={commentState.modal} onHide={handleClose} centered>
                    <Modal.Body className="bg-dark error-message">
                        <p className="pop-up-text"> Additional info for {props.searchResults.title}</p>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={commentState.comment || ""}
                            name="comment"
                            onChange={handleCommentChange}
                            type="text"
                            placeholder="Comments"
                        />
                        <br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" value={commentState.dvd} name="dvd" onChange={handleCheckChange} checked={commentState.dvd} />
                            <label className="form-check-label pop-up-text"> DVD </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" value={commentState.blue_ray} name="blue_ray" onChange={handleCheckChange} checked={commentState.blue_ray} />
                            <label className="form-check-label pop-up-text"> Blu-ray</label>
                        </div>
                        <br />
                        <Button variant="primary" onClick={addToCollection} style={{ margin: "10px" }}>
                            Save
                        </Button>
                        <Button variant="danger" onClick={handleClose} style={{ margin: "10px" }}>
                            Cancel
                        </Button>
                    </Modal.Body>
                </Modal>
                : null
            }
            <div className="row">
                <div className="col-4  my-auto">
                    <img src={props.searchResults.poster} alt={props.searchResults.title + "Poster"} className="poster-size" />
                </div>
                <div className="col-8">
                    <div className="row description-row">
                        <div className="col-12">
                            <p> {props.searchResults.title} ({props.searchResults.year})</p>
                        </div>
                    </div>
                    {props.loggedIn === true
                        ?
                        <>
                            <br />
                            <div className="row">
                                <div className="col-12">
                                    {props.searchResults.owned === false
                                        ? <button onClick={openModal}> Add to Collection </button>
                                        : <button disabled> Already Owned </button>
                                    }
                                </div>
                            </div>
                        </>
                        : <>
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
            <hr className="slate-hr" />
        </div>

    );
}

export default SearchResults;