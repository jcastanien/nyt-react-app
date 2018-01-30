import axios from "axios";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="
const APIKEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=";

export default {
  searchArticles: function(q, startYear, endYear) {
    return axios.get(BASEURL + APIKEY + q + '&begin_date=' + startYear + '&end_date=' + endYear);
  },
  // Gets all books
  getArticles: function () {
    return axios.get("/api/nyt");
  },
  // Deletes the book with the given id
  deleteArticles: function (id) {
    return axios.delete("/api/nyt/" + id);
  },
  // Saves a book to the database
  saveArticle: function (articleData) {
    return axios.post("/api/nyt", articleData);
  }
};
