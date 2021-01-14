
let dbJSON = require("../db/db.json");

// Routes 

module.exports = function(app) {
   // GET the api for the notes
   app.get("/api/notes", function(request, response) {
      response.json(dbJSON);
   });

   
   app.post("/api/notes", function(request, response) {
      console.log("Post successful! Data logged:");
      console.log(response.req.body);
      dbJSON.push(response.req.body);
      response.end("yes");
   });

   

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