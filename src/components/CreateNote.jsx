import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, TextField, Snackbar, Alert } from "@mui/material";

function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // Can be "success", "warning", "error", or "info"
  });

  function validateForm() {
    setIsValid(note.title.trim() !== "" && note.content.trim() !== "");
  }

  function submitNote(event) {
    event.preventDefault();

    if (!isValid) {
      setSnackbar({
        open: true,
        message: "Don't Waste Notes :)",
        severity: "warning",
      });
      return;
    }

    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    setIsValid(false);
    setSnackbar({
      open: true,
      message: "Note added successfully!",
      severity: "success",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleSnackbarClose() {
    setSnackbar({ ...snackbar, open: false });
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
        onBlur={validateForm}
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
        onBlur={validateForm}
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

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateNote;
