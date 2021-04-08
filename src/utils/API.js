const URL_PREFIX = process.env.REACT_APP_URL_BASE

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
        console.log(err);
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // requires: user database id (integer)  
  verifyUser: function (id) {
    return fetch(`${URL_PREFIX}api/users/verify/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // requires: user database id (integer) 
  verifyCheck: function (id) {
    return fetch(`${URL_PREFIX}api/users/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // requires: user email (string) 
  emailCheck: function (email) {
    return fetch(`${URL_PREFIX}api/users/email/${email}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // requires: user database id (integer), changePass status (bool)
  changePass: function (id, status) {
    return fetch(`${URL_PREFIX}api/users/change/pass/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({changePass: status})
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return null;
    });
  },
  // requires: user database id (integer), pass (string)
  resetPass: function (id, pass) {
    return fetch(`${URL_PREFIX}api/users/reset/pass/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({newPass: pass})
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
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
        if(res.status === 401){
            window.location.href = "/expired";
        }
        return res.json();
    }).catch(function (err) {
        return null;
    });
  }

};

export default API;