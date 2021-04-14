import React from "react";
import "./bookCollection.css";
import API from "../../utils/API.js";

function BookCollection(props) {
  // required props:
  // setUserState()
  // userState.token
  // collection.cover
  // collection.title
  // collection.subtitle (if available)
  // collection.published (if available)
  // collection.author
  // collection.id

  // function that will remove the book from the user's collection
  function removeFromCollection() {
    //API call to remove the book from the user's collection in the database
    API.removeBook(props.userState.token, props.collection.id).then(function (delBook) {
      //If a book was removed, refresh the user's book list in the app
      if (delBook) {
        API.getUserBooks(props.userState.token).then(function (userBooks) {
          //If the user has books after the refresh, store them in the user state hook
          if (userBooks) {
            props.setUserState({ ...props.userState, books: userBooks });
          }
        });
      }
    });
  }
  // visual:
  // cover image    - title                        - remove button
  //                - subtitle (if present)
  //                - year published (if present)
  //                - author
  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-12 my-auto">
          <img src={props.collection.cover} alt={props.collection.title + "Cover"} className="cover-size" />
        </div>
        <div className="col-lg-4 col-md-12 my-auto">
          <div className="row description-row">
            <div className="col-12">
              <p> {props.collection.title} <br />
                {/* if the book has a subtitle, display it */}
                {props.collection.subtitle
                  ? <> {props.collection.subtitle} <br /> </>
                  : null
                }
                {/* if the book has a publication date, display the year */}
                {props.collection.published
                  ? <> ({props.collection.published.substring(0, 4)}) <br /> </>
                  : null
                }
                {props.collection.author}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 my-auto">
          {/* the remove button will call an API function to remove it from the user in the database when pressed */}
          <button onClick={function () { removeFromCollection() }}> Remove </button>
        </div>
      </div>
      <hr className="slate-hr" />
    </div>

  );
}

export default BookCollection;