import React from "react";
import "./bookCollection.css";
import API from "../../utils/API.js";

function BookCollection(props) {

  function removeFromCollection() {
    API.removeBook(props.userState.token, props.collection.id).then(function (delBook) {
      if (delBook) {
        API.getUserBooks(props.userState.token).then(function (userBooks) {
          if (userBooks) {
            props.setUserState({ ...props.userState, books: userBooks });
          }
        });
      }
    });
  }

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
                {props.collection.subtitle
                  ? <> {props.collection.subtitle} <br /> </>
                  : null
                }
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
          <button onClick={function () { removeFromCollection() }}> Remove </button>
        </div>
      </div>
      <hr className="slate-hr" />
    </div>

  );
}

export default BookCollection;