import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import CreateBoard from '../components/CreateBoard';
import Footer from "../components/Footer";
import { addItem, deleteItem, checkItem, holdItem, filterItems } from '../utils/helper';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, IconButton, Popover, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useItemUtils } from '../utils/useItemUtils';

const BoardList = (props) => {
  const [items, setItems] = useRecoilState(itemsState); // State for boards
  const [snackbar, setSnackbar] = useRecoilState(snackbarState); // State for snackbar notifications
  const [filter, setFilter] = useState(''); // State for filtering boards
  const [draggingIndex, setDraggingIndex] = useState(null); // State for tracking dragged item
  const [draggedColumn, setDraggedColumn] = useState(''); // State to track the column of the dragged item
  const [editingIndex, setEditingIndex] = useState(null); // State for tracking selected board to edit
  const [anchorEl, setAnchorEl] = useState(null); // State for popover anchor
  const [popoverIndex, setPopoverIndex] = useState(null); // State to track the index of the item being edited

  const handleDragStart = (index, column) => {
    setDraggingIndex(index);
    setDraggedColumn(column);
  };

  const handleDrop = (targetColumn, event) => {
    event.preventDefault();
    if (draggingIndex !== null && draggedColumn !== targetColumn) {
      const updatedItems = [...items];
      const draggedItem = updatedItems[draggingIndex];
      updatedItems.splice(draggingIndex, 1);

      // Update item based on the target column
      if (targetColumn === 'todo') {
        draggedItem.checked = false;
        draggedItem.held = false;
      } else if (targetColumn === 'held') {
        draggedItem.held = true;
        draggedItem.checked = false;
      } else if (targetColumn === 'checked') {
        draggedItem.checked = true;
        draggedItem.held = false;
      }

      updatedItems.push(draggedItem);
      setItems(updatedItems);
    }
    setDraggingIndex(null);
  };

  const filteredItems = filterItems(items, filter);
  const todoItems = filteredItems.filter(item => !item.checked && !item.held);
  const heldItems = filteredItems.filter(item => item.held);
  const checkedItems = filteredItems.filter(item => item.checked);

  const {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    handleEdit,
  } = useItemUtils({ ...props, type: 'Row' });

  const handleClickPopover = (event, index) => {
    setPopoverIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setPopoverIndex(null);
  };

  const buttonStyle = {
    color: 'white',
    borderRadius: '100%',
    backgroundColor: '#f66b6b',
    padding: '3px',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f5f7', gap: '10px' }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CreateBoard onAdd={(newItem, setSnackbar) => addItem(setItems, newItem, setSnackbar, "Board")} />
      </Box>

      {/* Mui element for form text field */}
      <TextField onChange={(e) => setFilter(e.target.value)} value={filter} placeholder="Filter Boards!" variant="standard" />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '1em' }}>
        {/* To-Do Column */}
        <Box
          sx={{
            flex: 1,
            margin: '10px',
            backgroundColor: '#e0e0e0',
            borderRadius: '8px',
            padding: '10px',
          }}
          onDrop={(e) => handleDrop('todo', e)}
          onDragOver={(e) => e.preventDefault()}
        >
          <Typography variant="h6">To-Do</Typography>
          {todoItems.map((item, index) => (
            <Card
              key={index}
              variant="outlined"
              draggable
              onDragStart={() => handleDragStart(index, 'todo')}
              sx={{
                backgroundColor: 'rgb(248, 248, 154)',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            >
              <CardContent>
                <Typography>{item.title}</Typography>
                <Typography>{item.content}</Typography>
                <IconButton
                  aria-describedby="simple-popover"
                  variant="contained"
                  onClick={(e) => handleClickPopover(e, index)}
                >
                  <MoreVertIcon sx={buttonStyle} fontSize="small" />
                </IconButton>
                <Popover
                  id="simple-popover"
                  open={anchorEl && popoverIndex === index}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box sx={{ padding: '8px', backgroundColor: '#3498db', borderRadius: '5px' }}>
                    <IconButton
                      onClick={() => {
                        if (isEditing) {
                          handleSave(item, popoverIndex, editedTitle, editedContent);
                        } else {
                          handleEdit();
                        }
                      }}
                    >
                      {isEditing ? (
                        <SaveIcon fontSize="small" sx={buttonStyle} />
                      ) : (
                        <EditIcon fontSize="small" sx={buttonStyle} />
                      )}
                    </IconButton>
                    <IconButton onClick={() => holdItem(setItems, popoverIndex, setSnackbar, 'Board')} variant="contained">
                      <BackHandIcon fontSize="small" sx={buttonStyle} />
                    </IconButton>
                    <IconButton onClick={() => checkItem(setItems, popoverIndex, setSnackbar, 'Board')} variant="contained">
                      <CheckCircleIcon fontSize="small" sx={buttonStyle} />
                    </IconButton>
                    <IconButton onClick={() => deleteItem(setItems, popoverIndex, setSnackbar, 'Board')} variant="contained">
                      <DeleteIcon fontSize="small" sx={buttonStyle} />
                    </IconButton>
                  </Box>
                </Popover>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Held Column */}
        <Box
          sx={{
            flex: 1,
            margin: '10px',
            backgroundColor: '#d0e4f7',
            borderRadius: '8px',
            padding: '10px',
          }}
          onDrop={(e) => handleDrop('held', e)}
          onDragOver={(e) => e.preventDefault()}
        >
          <Typography variant="h6">Held</Typography>
          {heldItems.map((item, index) => (
            <Card
              key={index}
              variant="outlined"
              draggable
              onDragStart={() => handleDragStart(index, 'held')}
              sx={{
                backgroundColor: 'rgb(115, 191, 238)',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            >
              <CardContent>
                <Typography>{item.title}</Typography>
                <Typography>{item.content}</Typography>
                <IconButton
                  aria-describedby="simple-popover"
                  variant="contained"
                  onClick={(e) => handleClickPopover(e, index)}
                >
                  <MoreVertIcon sx={buttonStyle} fontSize="small" />
                </IconButton>
                <Popover
                  id="simple-popover"
                  open={anchorEl && popoverIndex === index}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box sx={{ padding: '8px', backgroundColor: '#3498db', borderRadius: '5px' }}>
                    <IconButton
                      onClick={() => {
                        if (isEditing) {
                          handleSave(item, popoverIndex, editedTitle, editedContent);
                        } else {
                          handleEdit();
                        }
                      }}
                    >
                      {isEditing ? (
                        <SaveIcon fontSize="small" sx={buttonStyle} />
                      ) : (
                        <EditIcon fontSize="small" sx={buttonStyle} />
                      )}
                    </IconButton>
                    <IconButton onClick={() => holdItem(setItems, popoverIndex, setSnackbar, 'Board')} variant="contained">
                      <BackHandIcon fontSize="small" sx={buttonStyle} />
                    </IconButton>
                    <IconButton onClick={() => checkItem(setItems, popoverIndex, setSnackbar, 'Board')} variant="contained">
                      <CheckCircleIcon fontSize="small" sx={buttonStyle} />
                    </IconButton>
                    <IconButton onClick={() => deleteItem(setItems, popoverIndex, setSnackbar, 'Board')} variant="contained">
                      <DeleteIcon fontSize="small" sx={buttonStyle} />
                    </IconButton>
                  </Box>
                </Popover>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Checked Column */}
        <Box
          sx={{
            flex: 1,
            margin: '10px',
            backgroundColor: '#b2f2b2',
            borderRadius: '8px',
            padding: '10px',
          }}
          onDrop={(e) => handleDrop('checked', e)}
          onDragOver={(e) => e.preventDefault()}
        >
          <Typography variant="h6">Checked</Typography>
          {checkedItems.map((item, index) => (
            <Card
              key={index}
              variant="outlined"
              draggable
              onDragStart={() => handleDragStart(index, 'checked')}
              sx={{
                backgroundColor: 'rgb(119, 237, 119)',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            >
              <CardContent>
                <Typography>{item.title}</Typography>
                <Typography>{item.content}</Typography>
                <IconButton
                  aria-describedby="simple-popover"
                  variant="contained"
                  onClick={(e) => handleClickPopover(e, index)}
                >
                  <MoreVertIcon sx={buttonStyle} fontSize="small" />
                </IconButton>
                <Popover
                  id="simple-popover"
                  open={anchorEl && popoverIndex === index}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box sx={{ padding: '8px', backgroundColor: '#3498db', borderRadius: '5px' }}>
                    <IconButton
                      onClick={() => {
                        if (isEditing) {
                          handleSave(item, popoverIndex, editedTitle, editedContent);
                        } else {
                          handleEdit();
                        }
                      }}
                    >
                      {isEditing ? (
                        <SaveIcon fontSize="small" sx={buttonStyle} />
                      ) : (
                        <EditIcon fontSize="small" sx={buttonStyle} />
                      )}
                    </IconButton>
                    <IconButton onClick={() => holdItem(setItems, popoverIndex, setSnackbar, 'Board')} variant="contained">
                      <BackHandIcon fontSize="small" sx={buttonStyle} />
                    </IconButton>
                    <IconButton onClick={() => checkItem(setItems, popoverIndex, setSnackbar, 'Board')} variant="contained">
                      <CheckCircleIcon fontSize="small" sx={buttonStyle} />
                    </IconButton>
                    <IconButton onClick={() => deleteItem(setItems, popoverIndex, setSnackbar, 'Board')} variant="contained">
                      <DeleteIcon fontSize="small" sx={buttonStyle} />
                    </IconButton>
                  </Box>
                </Popover>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default BoardList;
