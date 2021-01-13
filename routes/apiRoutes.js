
// I'm linking the route to my JSON data
const dbJSON = require("../db/db");
// Routes 

module.exports = function(app) {
   // GET the api for the notes
   app.get("/api/notes", function(request, response) {
      return response.json(path.join(__dirname, "../db/db.json"));
      response.json(dbJSON);
   });

   app.post("/api/notes", function(request, response) {
      let title = response.title;
      let text = response.text;

      let dataJSON = `{ "title": ${title}, "text": ${text} }`;

      dbJSON.push(dataJSON);
      console.log(response.req.body);
      dbJSON.push(response.req.body);
   });
};
