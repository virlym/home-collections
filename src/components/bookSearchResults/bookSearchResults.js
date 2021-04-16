import React from "react";
import "./bookSearchResults.css";
import API from "../../utils/API.js";

function BookSearchResults(props) {
    // required props:
    // setUserState()
    // token
    // userState
    // searchResults.cover
    // searchResults.title
    // searchResults.subtitle (if available)
    // searchResults.published (if available)
    // searchResults.publisher (if available)
    // searchResults.authors
    // searchResults.id

    // create a base string for authors to store in the database
    let authors = "";

    // if the authors are present in the data, convert the array into a string with each author separated by a comma
    if (props.searchResults.authors) {
        for (let i = 0; i < props.searchResults.authors.length; i++) {
            if (i > 0) {
                authors = authors + ", ";
            }
            authors = authors + props.searchResults.authors[i];
        }
    }

    // function that will create an object out of the present info and add it to the database
    function addToCollection() {
        const bookObj = {
            google_id: props.searchResults.id,
            title: props.searchResults.title,
            subtitle: props.searchResults.subtitle || "",
            author: authors,
            cover: props.searchResults.cover,
            publisher: props.searchResults.publisher || "",
            published: props.searchResults.published || ""
        }
        // api call to add the book information to the database under the user's info
        API.collectBook(props.token, bookObj).then(function (newBook) {
            if (newBook) {
                // if book addition was successful, update the displayed user information
                API.getUserBooks(props.token).then(function (userBooks) {
                    if (userBooks) {
                        props.setUserState({ ...props.userState, books: userBooks });
                    }
                });
            }
        });
    }

    // visual:
    // cover image    - title                        - add button (disabled if not logged in)
    //                - subtitle (if present)
    //                - year published (if present)
    //                - author(s)
    return (
        <div>
            <div className="row">
                <div className="col-4 my-auto">
                    <img src={props.searchResults.cover} alt={props.searchResults.title + "Cover"} className="cover-size" />
                </div>
                <div className="col-8">
                    <div className="row description-row">
                        <div className="col-12">
                            <p> {props.searchResults.title} <br />
                                {/* if the book has a subtitle, display it */}
                                {props.searchResults.subtitle
                                    ? <> {props.searchResults.subtitle} <br /> </>
                                    : null
                                }
                                {/* if the book has a publication date, display the year */}
                                {props.searchResults.published
                                    ? <> ({props.searchResults.published.substring(0, 4)}) <br />  </>
                                    : null
                                }
                                {authors}</p>
                        </div>
                    </div>
                    {/* if the user is logged in, show the button so they can collect the book */}
                    {/* if the user is not logged in, show the disabled button until they log in */}
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

export default BookSearchResults;