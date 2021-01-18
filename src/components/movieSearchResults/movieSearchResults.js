import React from "react";
import "./movieSearchResults.css";

function SearchResults(props) {
    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <img src={props.searchResults.poster} alt={props.searchResults.title + "Poster"} className="poster-size"/>
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
                                    ? <button onClick={function(){props.addToCollection(props.searchResults.id)}}> Add to Collection </button>
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

export default SearchResults;