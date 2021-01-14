const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");
// const dbJSONObj = require("../../../db/db");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// function getIDIndex() {
//    let dbLength = dbJSONObj.length;
//    console.log(dbLength);
// }

let noteID = 1;

// A function for getting all notes from the db
function getNotes() {
   return $.ajax({
      url: "/api/notes",
      method: "GET"
   });
}

// A function for saving a note to the db
function saveNote(note) {
   return $.ajax({
      url: "/api/notes",
      data: note,
      method: "POST"
   });
}

// A function for deleting a note from the db
function deleteNote(id) {
   return $.ajax({
      url: "api/notes/" + id,
      method: "DELETE"
   });
}

// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = function() {
   $saveNoteBtn.hide();

   if (activeNote.id) {
      $noteTitle.attr("readonly", true);
      $noteText.attr("readonly", true);
      $noteTitle.val(activeNote.title);
      $noteText.val(activeNote.text);
   } else {
      $noteTitle.attr("readonly", false);
      $noteText.attr("readonly", false);
      $noteTitle.val("");
      $noteText.val("");
   }
};

// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = function() {
   console.log("click heard!");

   var newNote = {
      title: $noteTitle.val(),
      text: $noteText.val(),
      id: noteID
   };

   noteID++;

   saveNote(newNote).then(function(data) {
      console.log("saved!");
      getAndRenderNotes();
      renderActiveNote();
   });
};

// Delete the clicked note
const handleNoteDelete = function(event) {
   // prevents the click listener for the list from being called when the button inside of it is clicked
   event.stopPropagation();

   console.log("delete click heard!");

   var note = $(this)
      .parent(".list-group-item")
      .data();

   console.log(note);

   if (activeNote.id === note.id) {
      activeNote = {};
   }

   deleteNote(note.id).then(function() {
      console.log("deleted from this jownt");
      getAndRenderNotes();
      renderActiveNote();
   });
};

/
const handleNoteView = function() {
   activeNote = $(this).data();
   renderActiveNote();
};


const handleNewNoteView = function() {
   activeNote = {};
   renderActiveNote();
};


const handleRenderSaveBtn = function() {
   if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
      $saveNoteBtn.hide();
   } else {
      $saveNoteBtn.show();
   }
};

const renderNoteList = function(notes) {
   $noteList.empty();

   var noteListItems = [];

   for (var i = 0; i < notes.length; i++) {
      var note = notes[i];

      var $li = $(`<li class='list-group-item' data-note='${note.id}'>`).data(
         note
      );
      var $span = $("<span>").text(note.title);
      var $delBtn = $(
         "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );

      $li.append($span, $delBtn);
      noteListItems.push($li);
   }

   $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = function() {
   return getNotes().then(function(data) {
      console.log("rendered data successfully");
      renderNoteList(data);
   });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();
// getIDIndex();
