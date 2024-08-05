import React, { useState } from "react";
import '../styles/NoteList.component.css';


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isValid, setIsValid] = useState(false);

  function validateForm() {
    setIsValid(note.title.trim() !== "" && note.content.trim() !== "");
  }

  function submitNote(event) {
    if (!isValid) {
        alert("Don't Waste Notes :)");
        event.preventDefault();
        return; 
    }
    
    if (isValid) {
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
      setIsValid(false);
    }
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }
  
  return (
    <div>
      <form className="CreateArea">
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          onBlur={validateForm}
          placeholder="Title"
          className="CreateArea-input"
          autoComplete="true"
        />

        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          onBlur={validateForm}
          placeholder="Stick up your Notes!..."
          rows="3"
          className="CreateArea-textarea"
          autoComplete="true"
        />

        <button className="CreateArea-btn" onClick={submitNote}>
          Add
        </button>

      </form>

    </div>
  );
}

export default CreateArea;
