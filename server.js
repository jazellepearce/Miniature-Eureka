
const PORT = process.env.PORT || 3005;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();


const { notes } = require('./Develop/db/db.json')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )

    return note;
}

/*const saveNote = (function () {
    const notesEl = document.getElementsByClassName("note-textarea")
    const notesCache = JSON.parse(localStorage.getItem('saveNote') || "[]");
    notesCache.forEach(createNewNote)
})
*/

app.post('/api/notes', (req, res) => {
    const newNote = req.body
    //newNote.id = uuid()
    const note = req.body
    notes.push(note);
    fs.writeFile('./Develop/db/db.json', JSON.stringify(notes , null, 2), function (err, data) {
      if (err) {
        throw err
      } else {
        res.send(data)
      }
    });
  });

/*app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});
*/

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './Develop/db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

