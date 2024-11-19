import React, { useState } from "react";
import { toast } from "react-toastify";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

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
    //Using MUI Box as a div
    // The sx property allows to change the style of the component, replacing css files.
    <Box sx={{ width: '250px', height: '120px', backgroundColor: 'white', padding: '1.3em', margin: '1.3em', borderRadius: '20px', border: '3px lightseagreen outset', boxShadow: 'solid 10 2px 5px #aaa;' }}>
      <TextField
        size="small"
        id="title"
        name="title"
        value={row.title}
        placeholder="Title"
        onBlur={validateForm}
        onChange={handleChange}
        autoComplete="true"
        fullWidth
        variant="standard"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '1em',
          fontWeight: 'bold',
          fontFamily: 'inherit',
        }}
      />
      <TextField
        size="small"
        id="content"
        name="content"
        value={row.content}
        placeholder="Type your Content !..."
        onBlur={validateForm}
        onChange={handleChange}
        autoComplete="true"
        multiline
        rows={4}
        fullWidth
        variant="standard"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '1em',
          fontWeight: 'bold',
          fontFamily: 'inherit',
        }}
      />
      <IconButton
        variant="contained"
        color="primary"
        type="submit"
        onClick={submitRow}
        size="small"
        sx={{
          right: '-70px',
          bottom: '5px',
          backgroundColor: '#FF6B6B',
          fontSize: '1.3em',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '2em',
          height: '2em',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          outline: 'none',
          transition: 'background-color 0.2s ease, transform 0.2s ease',
          '&:hover': {
            backgroundColor: '#fe4848',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(1px)',
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default CreateRow;
