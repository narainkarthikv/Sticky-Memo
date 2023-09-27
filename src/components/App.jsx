import React, { useState } from "react";
import Header from "./Header";
import "./styles.css";
import Note from "./Note";
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
          return { ...noteItem, checked: !noteItem.checked, held: false};
        return noteItem;
      });
    });
  }

  function holdNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.map((noteItem, index) => {
        if (id === index)
          return { ...noteItem, held: !noteItem.held, checked: false};
        return noteItem;
      });
    });
  }

  const checkedNotes = notes.filter((noteItem) => noteItem.checked );

  const heldNotes = notes.filter((noteItem) => noteItem.held );

  const allNotes = notes.map((noteItem) => ({...noteItem, all: true}));
 
  return (
    <div className="app-container">
      <Header />
      <CreateArea onAdd={addNote} />

      <div className="notes-container">
        {checkedNotes.length > 0 && (
          <div className="note-section-checked">
            <div className="note-section-header-checked">
              <h2 className="note-header">{`Checked Notes: ${checkedNotes.length}`}</h2>
            </div>
            {checkedNotes.map((noteItem, index) => (
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
                all={noteItem.all}
              />
            ))}
          </div>
        )}

        {heldNotes.length > 0 && (
          <div className="note-section-held">
            <div className="note-section-header-held">
              <h2 className="note-header">{`Held Notes: ${heldNotes.length}`}</h2>
            </div>
            
            {heldNotes.map((noteItem, index) => (
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
                all={noteItem.all}
              />
            ))}
          </div>
        )}

        {notes.length > 0 && 
        <div className="note-section-all">
          <div className="note-section-header-all">
            <h2 className="note-header">{`All Notes: ${notes.length}`}</h2>
          </div>
          
          {allNotes.map((noteItem, index) => (
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
              all={noteItem.all}
            />
          ))}
        </div>}
      </div>
    </div>
  );
}

export default App;