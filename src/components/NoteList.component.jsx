import React, { useState } from "react";
import CreateArea from "./CreateArea.component";
import Note from './Note.component';
import '../css/NoteList.component.css';
import FilterNotes from "./FilterNotes.component";

const NoteList = () => {
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
                    return { ...noteItem, checked: !noteItem.checked, held: false };
                return noteItem;
            });
        });
    }

    function holdNote(id) {
        setNotes((prevNotes) => {
            return prevNotes.map((noteItem, index) => {
                if (id === index)
                    return { ...noteItem, held: !noteItem.held, checked: false };
                return noteItem;
            });
        });
    }

    const allNotes = notes.map((noteItem) => ({ ...noteItem, all: true }));

    return (
        <div className="NoteList">
            <div className="create-and-filter-container">
                <CreateArea onAdd={addNote} />
                <FilterNotes notes={notes} />
            </div>
            <div className="notes-container">
                <div className="notes">
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
            </div>
        </div>
    );
}

export default NoteList;
