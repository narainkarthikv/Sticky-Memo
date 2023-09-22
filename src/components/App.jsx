import React, { useState } from "react";
import Header from "./Header";
import './styles.css';
import Note from "./Note"
import CreateArea from "./CreateArea";



function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, { ...newNote, checked: false, held: false }];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function checkNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.map((noteItem, index) => {
        if (id === index)
          return { ...noteItem, checked: !noteItem.checked, held: '' };
        return noteItem;
      });
    });
  }

  function holdNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.map((noteItem, index) => {
        if(id === index)
          return {...noteItem, held: !noteItem.held, checked: '' };
        return noteItem;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onCheck={checkNote}
            onHold={holdNote}
            checked={noteItem.checked}
            held={noteItem.held}
          />
        );
      })}
    </div>
  );
}

export default App;