// Load Data
// I'm linking the route to my JSON data
let dbJSON = require("../db/db");

// Routes ======================================================

module.exports = function(app) {
   // GET the api for the notes
   app.get("/api/notes", function(request, response) {
      response.json(dbJSON);
   });

   // add new items to the api when they are added
   app.post("/api/notes", function(request, response) {
      console.log("Post successful! Data logged:");
      console.log(response.req.body);
      dbJSON.push(response.req.body);
      response.end("yes");
   });

   // delete items when the trashcan icon is pressed

   app.delete("/api/notes/:note", function(request, response) {
      console.log("Record deleted");
      let newDbJSON = [];
      const thisNoteID = request.params.note;
      const noteToDelete = dbJSON.map(note => {
         if (note.id !== thisNoteID) {
            newDbJSON.push(note);
         }
      });

      dbJSON = newDbJSON;

      response.end();
   });
};