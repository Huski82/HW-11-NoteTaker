const router = require("express").Router();
const {nanoid} = require("nanoid")
const fs = require('fs')
const path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");

const dbJSON = path.join(__dirname, "../db/db.json");


module.exports = function(app) {
   // GET the api for the notes
   app.get("/api/notes", function(request, response) {
     fs.readFile (dbJSON,"utf8",(err,data) => {
        if (err) throw err;
        response.json(JSON.parse(data)); 
     })
   
   });

   
   app.post("/api/notes", (req,res) => {
      let noteid = nanoid(10);
      let allNotes = [];
      fs.readFile(dbJSON,'utf8', (err,data) =>  {
         if (err) throw err;
         allNotes = JSON.parse(data);
         let newNote = {"id": noteid, "title": req.body.title, "text": req.body.text};
         allNotes.push(newNote)
           fs.writeFile(dbJSON, JSON.stringify(allNotes),(err) => {
             if (err) throw err;
           })
       })
      res.json({msg: 'new note added to database'})
   });
      
       

    app.delete("/api/notes/:note", function(request, response) {
      console.log("Record deleted");
      let allNotes = [];
      let newDbJSON = [];
      const thisNoteID = request.params.note;
      fs.readFile(dbJSON,'utf8', (err,data) =>  {
         if (err) throw err;
         allNotes = JSON.parse(data);
          
        for (let i = 0; i < allNotes.length; i++) {
         if (allNotes[i].id !== thisNoteID)
         {newDbJSON.push (allNotes[i])
         }

         
         }
         fs.writeFile(dbJSON, JSON.stringify(newDbJSON),(err) => {
            if (err) throw err;
          })
      });

      response.end();
   });
};