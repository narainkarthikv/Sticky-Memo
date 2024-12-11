import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { snackbarState } from "../utils/state";

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
    <Box
      sx={{
        width: "250px",
        height: "120px",
        backgroundColor: "white",
        padding: "1.3em",
        margin: "1.3em",
        borderRadius: "20px",
        border: "3px lightseagreen outset",
        boxShadow: "solid 10 2px 5px #aaa;",
      }}
    >
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
        sx={{
          display: "flex",
          flexDirection: "column",
          fontSize: "1em",
          fontWeight: "bold",
          fontFamily: "inherit",
        }}
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
        sx={{
          display: "flex",
          flexDirection: "column",
          fontSize: "1em",
          fontWeight: "bold",
          fontFamily: "inherit",
        }}
      />
      <IconButton
        size="small"
        color="primary"
        onClick={submitNote}
        sx={{
          right: "-70px",
          bottom: "10px",
          backgroundColor: "#FF6B6B",
          fontSize: "1.3em",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "2em",
          height: "2em",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          outline: "none",
          transition: "background-color 0.2s ease, transform 0.2s ease",
          "&:hover": {
            backgroundColor: "#fe4848",
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(1px)",
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default CreateNote;
