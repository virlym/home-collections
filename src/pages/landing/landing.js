import React from "react";
import { useHistory } from 'react-router-dom';
import "./landing.css";

function Landing(props) {
  let history = useHistory();

  function searchButton(page){
    if (page === "books"){
      props.setPageState({ currentPage: "books" });
      return history.push("/books");
    }
    else if (page === "movies"){
      props.setPageState({ currentPage: "movies" });
      return history.push("/movies");
    }
    else{
      props.setPageState({ currentPage: "music" });
      return history.push("/music");
    }
  }

  return (
    <div>
      <h1>Home Collections</h1>
      <div className="container icon-container">
        <div className="row">
          <div className="col-xs-12 col-sm-4 d-flex justify-content-center">
            <button onClick={function(){searchButton("books")}}>
              <img className="icon-size" src="https://hrce.insigniails.com/Library/images/~imageCT459526.JPG" alt="book-icon"/>
            </button>
          </div>
          <div className="col-xs-12 col-sm-4 d-flex justify-content-center">
            <button onClick={function(){searchButton("movies")}}>
              <img className="icon-size" src="https://hrce.insigniails.com/Library/images/~imageCT459526.JPG" alt="book-icon"/>
            </button>
          </div>
          <div className="col-xs-12 col-sm-4 d-flex justify-content-center">
            <button onClick={function(){searchButton("music")}}>
              <img className="icon-size" src="https://hrce.insigniails.com/Library/images/~imageCT459526.JPG" alt="book-icon"/>
            </button>
          </div>
        </div>
      </div>
      <p>
        Home Collections is a web app designed to help people keep track of their entertainment media.

        Anyone may utilize the search engines to look up media, but in order to save anything, you need to create an account.

        The book search engine is powered by Google Books.
        The movie search engine is powered by OMDB.
        The music search engine is powered by Spotify.
      </p>
    </div>
  );
}

export default Landing;