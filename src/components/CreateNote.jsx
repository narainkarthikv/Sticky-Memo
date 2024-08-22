import React, { useState } from "react";
import { toast } from 'react-toastify';
import "../styles/NoteList.css";
import '../styles/Button.css';

function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isValid, setIsValid] = useState(false);

  function validateForm() {
    setIsValid(note.title.trim() !== "" && note.content.trim() !== "");
  }

  function submitNote(event) {
    if (!isValid) {
      toast.warn("Don't Waste Notes :)");
      event.preventDefault();
      return;
    }
  
    if (isValid) {
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
      setIsValid(false);
      toast.success("Note added successfully!");
    }
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <form className="create-area">
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          onBlur={validateForm}
          placeholder="Title"
          className="create-area-input"
          autoComplete="true"
          style={{ maxWidth: "100%", backgroundColor: "transparent" }}
        />

        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          onBlur={validateForm}
          placeholder="Type your Content !..."
          rows="3"
          className="create-area-textarea"
          autoComplete="true"
        />

        <button className="CreateNote-btn" onClick={submitNote}>
          +
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
