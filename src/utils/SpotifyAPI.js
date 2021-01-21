import axios from "axios";
const SpotifyAPI = {
    getToken: function() {
        return axios({
            // call the token url
            url: "https://accounts.spotify.com/api/token",
            // set the authorization headers
            headers: { 'Authorization' : `Basic ${process.env.REACT_APP_SPOTIFY_KEY}` },
            // set the data to client_credentials as per the spotify api instructions
            processData: false,
            data: "grant_type=client_credentials",
            responseType: "json",
            method: "post"
        });
    },
    artistSearch: function(query, token, offset) {
        return axios({
            url: `https://api.spotify.com/v1/search?q=artist%3A${query}&type=album&limit=50&offset=${offset}`,
            // set the authorization headers with the token
            headers: { 'Authorization': `${token}` },
            responseType: "json",
            method: "get"
        });
    },
    albumSearch: function(query, token, offset) {
        return axios({
            url: `https://api.spotify.com/v1/search?q=album%3A${query}&type=album&limit=50&offset=${offset}`,
            // set the authorization headers with the token
            headers: { 'Authorization': `${token}` },
            responseType: "json",
            method: "get"
        });
    },
    songSearch: function(query, token, offset) {
        return axios({
            url: `https://api.spotify.com/v1/search?q=track%3A${query}&type=track&limit=50&offset=${offset}`,
            // set the authorization headers with the token
            headers: { 'Authorization': `${token}` },
            responseType: "json",
            method: "get"
        });
    }
};
  
export default SpotifyAPI;
/*
search albums by artist:
GET https://api.spotify.com/v1/search

curl -X "GET" "https://api.spotify.com/v1/search?q=artist%3A${queryEncoded}&type=album" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}"

albums.items[x].artists.name
albums.items[x].id (album id)
albums.items[x].images[x].url
albums.items[x].name
albums.items[x].release_date (yyyy-mm-dd)
albums.items[x].total_tracks

~~~~~~~~~~~~

search albums by album title:
GET https://api.spotify.com/v1/search

curl -X "GET" "https://api.spotify.com/v1/search?q=album%3A${queryEncoded}&type=album" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}"

albums.items[x].artists.name
albums.items[x].id (album id)
albums.items[x].images[x].url
albums.items[x].name
albums.items[x].release_date (yyyy-mm-dd)
albums.items[x].total_tracks

~~~~~~~~~~~~~~~~~~

search albums by track:
GET https://api.spotify.com/v1/search

curl -X "GET" "https://api.spotify.com/v1/search?q=${trackName}&type=track" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}"

tracks.items[x].album.artists[x].name
tracks.items[x].album.id (album id)
tracks.items[x].album.images[x].url
tracks.items[x].album.name
tracks.items[x].album.release_date (yyyy-mm-dd)
tracks.items[x].album.tracks.items[x].album.total_tracks

~~~~~~~~~~~~~~~~~~

search tracks by album:
GET https://api.spotify.com/v1/albums/{id}/tracks

curl -X "GET" "https://api.spotify.com/v1/albums/${albumId}/tracks" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}"

items[x].name
items[x].track_number
items[x].duration_ms
*/