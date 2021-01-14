
const path = require("path");


// ROUTES

module.exports = function(app) {
   
   app.get("/notes", function(request, response) {
      response.sendFile(path.join(__dirname, "../public/notes.html"));
   });

   
   app.get("/assets/css/styles.css", function(request, response) {
      response.sendFile(
         path.join(__dirname, "../public/assets/css/styles.css")
      );
   });

   
   app.get("/assets/js/index.js", function(request, response) {
      response.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
   });

   
   app.get("*", function(request, response) {
      response.sendFile(path.join(__dirname, "../public/index.html"));
   });
};