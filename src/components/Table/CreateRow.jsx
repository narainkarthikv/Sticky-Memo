import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilState } from "recoil";
import { snackbarState } from "../../utils/state";
import { createRowBoxStyles, textFieldStyles, iconButtonStyles } from "./styles"; // Import specific styles

function CreateRow(props) {
  const [row, setRow] = useState({
    title: "",
    content: "",
  });

  const [snackbar, setSnackbar] = useRecoilState(snackbarState); // Use global snackbarState

  function submitRow(event) {
    event.preventDefault();
  
    // Call addItem and check if it was successful
    const success = props.onAdd(row, setSnackbar, "Row");
    if (success) {
      setRow({
        title: "",
        content: "",
      });
    }
  }
  
  function handleChange(event) {
    const { name, value } = event.target;
    setRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  }

  return (
    <Box sx={createRowBoxStyles}>
      <TextField
        size="small"
        id="title"
        name="title"
        value={row.title}
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
        value={row.content}
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
        variant="contained"
        color="primary"
        type="submit"
        onClick={submitRow}
        size="small"
        sx={iconButtonStyles}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default CreateRow;
