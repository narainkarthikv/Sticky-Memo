import React, { useState } from "react";
import Header from "./Header";
import "./styles.css";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

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

  const filteredNotes = notes.filter((noteItem) => {
    const searchValue = searchQuery.toLowerCase();
    const title = noteItem.title.toLowerCase();
    const content = noteItem.content.toLowerCase();

    return title.includes(searchValue) || content.includes(searchValue);
  });


  const hasSelectedNote = selectedNote !== null;

  const checkedNotes = notes.filter((noteItem) => noteItem.checked );

  const heldNotes = notes.filter((noteItem) => noteItem.held );

  const allNotes = notes.map((noteItem) => ({...noteItem, all: true}));
 
  return (
    <div className="app-container">
      <Header />
      <CreateArea onAdd={addNote} />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {hasSelectedNote && (
        <div className="note-section-selected">
          <div className="note-section-header-selected">
            <h2 className="note-header">Selected Note</h2>
          </div>
          <Note
            title={selectedNote.title}
            content={selectedNote.content}
            onDelete={() => setSelectedNote(null)}
            checked={selectedNote.checked}
            held={selectedNote.held}
            all={true} 
            golden={true} 
          />
        </div>
      )}

      {filteredNotes.length > 0 && (
        <div className="note-section-all">
          <div className="note-section-header-all">
            <h2 className="note-header">{`Filtered Notes: ${filteredNotes.length}`}</h2>
          </div>
          
          {filteredNotes.map((noteItem, index) => (
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
              all={true} 
            />
          ))}
        </div>
      )}

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

      {notes.length > 0 && (
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
        </div>
      )}
    </div>
  );
}

export default App;