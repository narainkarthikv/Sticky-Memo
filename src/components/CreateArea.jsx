import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

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

  return (
    <div>
      <form className="form-container">
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          onBlur={validateForm}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          onBlur={validateForm}
          placeholder="Stick up your Notes!..."
          rows="3"
        />
        <button onClick={submitNote}>
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
