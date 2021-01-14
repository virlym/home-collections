import axios from "axios";

const API = {
  search: function(title, page) {
    return axios.get(`https://www.omdbapi.com/?s=${title}&page=${page}&apikey=${process.env.REACT_APP_MOVIE_KEY}`);
  }
};

export default API;
/*
https://www.omdbapi.com/?s=${title}&y={year}&apikey=${key}
Search[x].Title
Search[x].Year
Search[x].imdbID
Search[x].Type
Search[x].Poster
*/