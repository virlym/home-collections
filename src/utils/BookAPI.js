import axios from "axios";

const BookAPI = {
  titleSearch: function(query, index) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=40&startIndex=${index}&langRestrict=en`);
  },
  authorSearch: function(query, index) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}&maxResults=40&startIndex=${index}&langRestrict=en`);
  },
  publisherSearch: function(query, index) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=inpublisher:${query}&maxResults=40&startIndex=${index}&langRestrict=en`);
  },
  subjectSearch: function(query, index) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${query}&maxResults=40&startIndex=${index}&langRestrict=en`);
  },
  isbnSearch: function(query, index) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${query}&maxResults=40&startIndex=${index}&langRestrict=en`);
  },
  generalSearch: function(query, index) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&startIndex=${index}&langRestrict=en`);
  }
};

export default BookAPI;
/*
https://developers.google.com/books/docs/v1/using
https://isbn-information.com/convert-isbn-10-to-isbn-13.html
items[]
items[x].id
items[x].volumeInfo.title
items[x].volumeInfo.subtitle
items[x].volumeInfo.authors[]
items[x].volumeInfo.publisher
items[x].volumeInfo.publishedDate (yyyy-mm-dd)
items[x].volumeInfo.description
items[x].volumeInfo.industryIdentifiers[x].type (ISBN_10, ISBN_13)
items[x].volumeInfo.industryIdentifiers[x].identifier (ISBN #)
items[x].volumeInfo.pageCount
items[x].volumeInfo.categories[] ("fiction")
items[x].volumeInfo.imageLinks.smallThumbnail
items[x].volumeInfo.imageLinks.thumbnail
items[x].volumeInfo.language
items[x].volumeInfo.infoLink
*/