import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { snackbarState } from "../../utils/state";
import { boxStyles, iconButtonStyles, textFieldStyles } from './styles';

function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [snackbar, setSnackbar] = useRecoilState(snackbarState); // Use global snackbarState

  function submitNote(event) {
    event.preventDefault();
  
    // Call addItem and check if it was successful
    const success = props.onAdd(note, setSnackbar, "Note");
    if (success) {
      setNote({
        title: "",
        content: "",
      });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <Box sx={boxStyles}>
      <TextField
        size="small"
        id="title"
        name="title"
        value={note.title}
        placeholder="Title"
        onChange={handleChange}
        autoComplete="true"
        fullWidth
        variant="standard"
        sx={textFieldStyles}
      />
      <TextField
        size="small"
        id="content"
        name="content"
        value={note.content}
        placeholder="Type your Content !..."
        onChange={handleChange}
        autoComplete="true"
        multiline
        rows={4}
        fullWidth
        variant="standard"
        sx={textFieldStyles}
      />
      <IconButton
        size="small"
        color="primary"
        onClick={submitNote}
        sx={iconButtonStyles}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default CreateNote;
