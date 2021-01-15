const router = require("express").Router();
const {nanoid} = require("nanoid")
const fs = require('fs')
const path = require("path");

const dbJSON = path.join(__dirname, "../db/db.json");


module.exports = function(app) {
   // GET the api for the notes
   app.get("/api/notes", function(request, response) {
     fs.readFile (dbJSON,"utf8",(err,data) => {
        if (err) throw err;
        response.json(JSON.parse(data)); 
     })
   
   });

   
   app.post("/api/notes", function(req,res) {
      console.log(req.body);
      let noteid;
      let allNotes = [];
      fs.readFile(dbJSON,"utf8",(err,data) => {
         if (err) throw err;
         allNotes = JSON.parse(data);
          console.log((allNotes))
      let newNote = {"title": req.body.title, "text": req.body.text};
       allNotes.push(newNote)
      })
      
       console.log (allNotes)
      fs.writeFile(dbJSON, JSON.stringify(allNotes),(err) => {
         if (err) throw err;
         })
         res.json({msg: 'new note added to database'})
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