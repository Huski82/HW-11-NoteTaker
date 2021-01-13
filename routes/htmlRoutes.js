// DEPENDENCIES
const path = require("path");

// ============================================
// ROUTES
// ============================================
module.exports = function(app) {
   // HTML GET requests
   app.get("/notes", function(request, response) {
      response.sendFile(path.join(__dirname, "./public/notes.html"));
   });

   // Default is to send user to the home page
   app.get("*", function(request, response) {
      response.sendFile(path.join(__dirname, "./public/index.html"));
   });
};