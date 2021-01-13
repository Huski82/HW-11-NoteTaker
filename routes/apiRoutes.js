// I need to link this to JSON Data file
const dbJSON = require("../db/db");

// Routes ======================================================

module.exports = function(app) {
   app.get("/api/notes", function(request, response) {
      return response.json(path.join(__dirname, "../db/db.json"));
   });

   app.post("/api/notes", function(request, response) {
      let title = response.title;
      let text = response.text;

      let dataJSON = `{ "title": ${title}, "text": ${text} }`;

      dbJSON.push(dataJSON);
   });
};