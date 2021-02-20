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
          <div className="col-xs-12 col-sm-4 d-flex justify-content-center icon-space">
            <button onClick={function(){searchButton("books")}}>
              <img className="icon-size" src="https://www.shareicon.net/data/128x128/2015/12/31/696126_books_512x512.png" alt="book-icon"/>
              <figcaption>Book Search</figcaption>
            </button>
          </div>
          <div className="col-xs-12 col-sm-4 d-flex justify-content-center icon-space">
            <button onClick={function(){searchButton("movies")}}>
              <img className="icon-size" src="https://lh6.googleusercontent.com/proxy/7XiOoRWE0uH5Ckp0CYV6wc8mTBf5FqQQi6GzfkBWw88iTcuvgtCnG2nqqy1lkcyvcJzi_q2WcO-wteXjCXQtkl3FwKvpyv0gpOnHokk=s0-d" alt="movie-icon"/>
              <figcaption>Movie Search</figcaption>
            </button>
          </div>
          <div className="col-xs-12 col-sm-4 d-flex justify-content-center icon-space">
            <button onClick={function(){searchButton("music")}}>
              <img className="icon-size" src="https://www.shareicon.net/data/128x128/2016/03/28/741104_multimedia_512x512.png" alt="music-icon"/>
              <figcaption>Music Search</figcaption>
            </button>
          </div>
        </div>
        <br /><br /><br />
      <p className="app-info">
        Home Collections is a web app designed to help people keep track of their entertainment media.
      </p>
      <p className="app-info">
        Anyone may utilize the search engines to look up media, but in order to save anything, you need to create an account.
      </p>
      <br /><br />
      <p className="app-info">
        The book search engine is powered by Google Books.
      </p>
      <p className="app-info">
        The movie search engine is powered by OMDB.
      </p>
      <p className="app-info">
        The music search engine is powered by Spotify.
      </p>
      </div>
    </div>
  );
}

export default Landing;