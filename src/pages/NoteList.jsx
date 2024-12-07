import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import CreateNote from '../components/CreateNote';
import Footer from "../components/Footer"
import { Box, Card, CardContent, IconButton, Popover, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { addItem, deleteItem, checkItem, holdItem, filterItems } from '../utils/helper';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useItemUtils } from '../utils/useItemUtils';

const NoteList = (props) => {
  // State to manage the list of notes using Recoil
  const [items, setItems] = useRecoilState(itemsState);

  // State to manage Snackbar notifications for displaying feedback messages using Recoil
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  // State to manage the filter input value
  const [filter, setFilter] = useState('');

  // State to track the index of the note being dragged
  const [draggingIndex, setDraggingIndex] = useState(null);

  // State to track the index of the note to edit
  const [editingIndex, setEditingIndex] = useState(null);

  // State to track the anchor to popover to be
  const [anchorEl, setAnchorEl] = useState(null);


  // Function to handle the start of a drag event
  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  // Function to handle drag over event, allowing drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle the drop event and update the items array based on the new order
  const handleDrop = (index, event) => {
    event.preventDefault();
    if (draggingIndex !== null && draggingIndex !== index) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggingIndex, 1);
      updatedItems.splice(index, 0, draggedItem);
      setItems(updatedItems);
    }
    setDraggingIndex(null);
  };

  // Function to handle saving changes to a note's title or content
  const handleSave = (item, id, newTitle, newContent) => {
    setIsEditing(false);

    const updatedItems = items.map((item, index) =>
      index === id ? { ...item, title: newTitle || item.title, content: newContent || item.content } : item
    );
    setItems(updatedItems);
  };
  // Filter the notes based on the filter input value
  const filteredItems = filterItems(items, filter);

  // Function to handle the button click and show the popover
  const handleClickPopover = (event, index) => {
    setEditingIndex(index);
    setAnchorEl(event.currentTarget);
  }

  // Function to handle the popover close
  const handleClosePopover = () => {
    setAnchorEl(null);
  }

  //Check if there is an anchorEl
  const open = Boolean(anchorEl);

  //Set id to 'simple-popover' if there is an anchorEl
  const id = open ? 'simple-popover' : undefined;

  //Button style pattern
  const buttonStyle = {
    color: 'white',
    borderRadius: '100%',
    backgroundColor: '#f66b6b',
    padding: '3px',
  }


  const {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    handleEdit,
  } = useItemUtils({ ...props, type: 'Row' });
  return (

    <Box sx={{ display: 'flex' }}>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity} // "success", "info", "warning", "error"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* Section to add a new note and filter existing notes */}
      <Box>
        <CreateNote onAdd={(newItem, setSnackbar) => addItem(setItems, newItem, setSnackbar, "Note")} />
        <TextField
          sx={{ margin: '1.3em' }}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          placeholder="Filter Notes!..."
          variant="standard"
        />
      </Box>

      {/* Container displaying the filtered list of notes */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          overflowY: 'auto',
          height: '500px',
          width: '80%',
          margin: '0 auto',
          padding: '0.5em',
          '&::-webkit-scrollbar': { width: '8px', backgroundColor: '#f1f1f1', borderRadius: '8px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'lightseagreen', borderRadius: '8px', transition: 'background-color 0.3s ease-in-out' },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'lightgreen' },
          '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '8px' },
        }}
      >
        {filteredItems.map((item, index) => (
          <Card
            key={index}
            variant="outlined"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDrop={(e) => handleDrop(index, e)}
            onDragOver={(e) => handleDragOver(e)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: item.checked ? 'rgb(119, 237, 119)' : item.held ? 'rgb(115, 191, 238)' : 'rgb(248, 248, 154)',
              borderRadius: '8px',
              width: '250px',
              height: '175px',
              padding: 0,
              transition: 'transform 0.3s ease-in, background-color 0.3s ease-in',
              margin: '20px 15px 0px 0px',
              border: 'none',
              overflow: 'hidden',
              '&:hover': { transform: 'scale(1.01)' },
            }}
          >
            <CardContent sx={{ padding: 0 }}>
              <Typography
                sx={{
                  backgroundColor: '#3498DB',
                  height: '2.6em',
                  color: 'white',
                  fontWeight: 'bold',
                  alignContent: 'center',
                  position: 'relative'
                }}
              >
                <>
                  {isEditing && editingIndex === index ? (
                    <TextField size='small' onChange={(e) => setEditedTitle(e.target.value)} defaultValue={item.title} ></TextField>
                  ) :
                    (
                      <span style={{ fontWeight: 'bolder' }}>{item.title}</span>
                    )
                  }
                </>
                <>
                  <IconButton
                    sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#f66b6b', padding: '3px', margin: '8px', color: 'white' }}
                    aria-describedby={id}
                    onClick={(e) => handleClickPopover(e, index)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>

                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: '#3498db',
                        padding: '0.5',
                        alignSelf: 'end'
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (isEditing) {
                            handleSave(item, editingIndex, editedTitle, editedContent);
                          } else {
                            handleEdit();
                          }
                        }}
                        variant='contained'
                      >
                        {isEditing ? (
                          <SaveIcon fontSize="small" sx={buttonStyle} />
                        ) : (
                          <EditIcon fontSize="small" sx={buttonStyle} />
                        )}
                      </IconButton>
                      <IconButton onClick={() => holdItem(setItems, editingIndex, setSnackbar, 'Note')} variant="contained">
                        <BackHandIcon fontSize="small" sx={buttonStyle} />
                      </IconButton>
                      <IconButton onClick={() => checkItem(setItems, editingIndex, setSnackbar, 'Note')} variant="contained">
                        <CheckCircleIcon fontSize="small" sx={buttonStyle} />
                      </IconButton>
                      <IconButton onClick={() => deleteItem(setItems, editingIndex, setSnackbar, 'Note')} variant="contained">
                        <DeleteIcon fontSize="small" sx={buttonStyle} />
                      </IconButton>
                    </Typography>
                  </Popover>
                </>
              </Typography>
              <Typography>
                {isEditing && editingIndex === index ? (
                  <TextField
                    size='small'
                    sx={{ width: '100%' }}
                    onChange={(e) => setEditedContent(e.target.value)}
                    defaultValue={item.content}
                  ></TextField>
                ) :
                  (
                    <span>{item.content}</span>
                  )
                }
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default NoteList;
