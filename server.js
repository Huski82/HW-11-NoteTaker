const express = require("express");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.urlenconded({ extended: true }));
app.use(express.json());

// Routes 

app.get("/notes", function(request, response) {
   response.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(request, response) {
   response.sendFile(path.join(__dirname, "./public/index.html"));
});
// Routes for the api and the html
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.get("/api/notes", function(request, response) {
   return response.json(path.join(__dirname, "./db/db.json"));
// Listener
app.listen(PORT, function() {
   console.log("App listening on PORT: " + PORT);
});