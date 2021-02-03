import React from "react";
import "./movieSearchResults.css";
import API from "../../utils/API.js";

function SearchResults(props) {

    function addToCollection() {
        const movieObj = {
            omdb_id: props.searchResults.id,
            title: props.searchResults.title,
            year: props.searchResults.year,
            poster: props.searchResults.poster
        }
        console.log(movieObj);
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

    return (
        <div>
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
                                        ? <button onClick={function () { addToCollection() }}> Add to Collection </button>
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