import React from "react";
import "./bookSearchResults.css";

function BookSearchResults(props) {
    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <img src={props.searchResults.cover} alt={props.searchResults.title + "Cover"} className="cover-size"/>
                </div>
                <div className="col-8">
                    <div className="row description-row">
                        <div className="col-12">
                            <p> {props.searchResults.title} <br /> {props.searchResults.subtitle}</p>
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

export default BookSearchResults;