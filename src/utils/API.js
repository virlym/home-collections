// const URL_PREFIX = "http://localhost:8080/"
const URL_PREFIX = "https://home-collections-api.herokuapp.com/"

const API = {
  //////////////////////////// User Calls ////////////////////////////
  // requires: email(string), password(string)
  createUser: function (info) {
    return fetch(`${URL_PREFIX}api/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // requires: email(string), password(string)
  loginUser: function (info) {
    return fetch(`${URL_PREFIX}api/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // requires: bearer token(string)
  getProfile: function (token) {
      return fetch(`${URL_PREFIX}api/users/profile`, {
          method: "GET",
          headers: {
              "authorization": `Bearer ${token}`
          },
      }).then(function (res) {
          return res.json();
      }).catch(function (err) {
          return null;
      });
  },
  // expects: user to be logged in
  // requires: bearer token(string) 
  disableUser: function (token) {
    return fetch(`${URL_PREFIX}api/users/disable`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },

  //////////////////////////// Book Calls ////////////////////////////
  // expects: user to be logged in
  // requires: bearer token(string) 
  getUserBooks: function (token) {
    return fetch(`${URL_PREFIX}api/books/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // expects: user to be logged in
  // requires: bearer token(string), google_id(string), title(string), subtitle(string), author(string), cover(string), publisher(string), published(string)
  collectBook: function (token, info) {
    return fetch(`${URL_PREFIX}api/books/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(info)
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // expects: user to be logged in
  // requires: bearer token(string), book database id(integer)
  removeBook: function (token, id) {
    return fetch(`${URL_PREFIX}api/books/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${token}`
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },

  //////////////////////////// Movie Calls ////////////////////////////
  // expects: user to be logged in
  // requires: bearer token(string) 
  getUserMovies: function (token) {
    return fetch(`${URL_PREFIX}api/movies/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // expects: user to be logged in
  // requires: bearer token(string), omdb_id(string), title(string), year(string), poster(string)
  collectMovie: function (token, info) {
    return fetch(`${URL_PREFIX}api/movies/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(info)
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // expects: user to be logged in
  // requires: bearer token(string), movie database id(integer), dvd(boolean), blue_ray(boolean)
  editMovie: function (token, id, info) {
    return fetch(`${URL_PREFIX}api/movies/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(info)
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // expects: user to be logged in
  // requires: bearer token(string), movie database id(integer)
  removeMovie: function (token, id) {
    return fetch(`${URL_PREFIX}api/movies/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${token}`
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },

  //////////////////////////// Music Calls ////////////////////////////
  // expects: user to be logged in
  // requires: bearer token(string) 
  getUserMusic: function (token) {
    return fetch(`${URL_PREFIX}api/music/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // expects: user to be logged in
  // requires: bearer token(string), spotify_id(string), album(string), release(string), album_art(string), artist(string)
  collectMusic: function (token, info) {
    return fetch(`${URL_PREFIX}api/music/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(info)
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // expects: user to be logged in
  // requires: bearer token(string), music database id(integer)
  removeMusic: function (token, id) {
    return fetch(`${URL_PREFIX}api/music/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${token}`
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  }

};

export default API;