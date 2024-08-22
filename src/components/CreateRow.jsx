import React, { useState } from "react";
import { toast } from "react-toastify";
import '../styles/TableList.css';
import '../styles/Button.css';

function CreateRow(props) {
  const [row, setRow] = useState({
    title: "",
    content: "",
  });

  const [isValid, setIsValid] = useState(false);

  function validateForm() {
    setIsValid(row.title.trim() !== "" && row.content.trim() !== "");
  }

  function submitRow(event) {
    event.preventDefault(); // Prevent default form submission

    if (!isValid) {
      toast.warn("Don't Waste Rows :)");
      return;
    }

    props.onAdd(row);
    setRow({
      title: "",
      content: ""
    });
    setIsValid(false);
    toast.success('Row Added Successfully');
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setRow((prevRow) => ({
      ...prevRow,
      [name]: value
    }));
    validateForm(); // Validate on every change
  }

  return (
    <form className="Tables-form-container" onSubmit={submitRow}>
      <div className="Tables-form-group">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          name="title"
          value={row.title}
          onChange={handleChange}
          onBlur={validateForm}
          placeholder="Title"
          className="Tables-form-control"
          autoComplete="true"
        />
      </div>

      <div className="Tables-form-group">
        <label htmlFor="content">Content: </label>
        <input
          id="content"
          name="content"
          value={row.content}
          onChange={handleChange}
          onBlur={validateForm}
          placeholder="Type your Content !..."
          className="Tables-form-control"
          autoComplete="true"
        />
      </div>

      <button className="CreateRow-btn" type="submit">
        +
      </button>
    </form>
  );
}

export default CreateRow;
