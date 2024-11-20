import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import CreateBoard from '../components/CreateBoard';
import Footer from "../components/Footer";
import { addItem, deleteItem, checkItem, holdItem, filterItems } from '../utils/helper';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, IconButton, Popover, TextField, Typography } from '@mui/material';
import { useItemUtils } from '../utils/useItemUtils';

const BoardList = (props) => {
  const [items, setItems] = useRecoilState(itemsState); // State for boards
  const [filter, setFilter] = useState(''); // State for filtering boards
  const [draggingIndex, setDraggingIndex] = useState(null); // State for tracking dragged board
  const [editingIndex, setEditingIndex] = useState(null); //State for tracking selected board to edit
  const [anchorEl, setAnchorEl] = useState(null); //State for popover anchor

  //Button style pattern
  const buttonStyle = {
    color: 'white',
    borderRadius: '100%',
    backgroundColor: '#f66b6b',
    padding: '3px',
  }

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

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

  const handleSave = (item, id, newTitle, newContent) => {
    setIsEditing(false);

    const updatedItems = items.map((item, index) =>
      index === id ? { ...item, title: newTitle || item.title, content: newContent || item.content } : item
    );
    setItems(updatedItems);
  };

  const handleClickPopover = (event, index) => {
    setEditingIndex(index);
    setAnchorEl(event.currentTarget);
  }
  const handleClosePopover = () => {
    setAnchorEl(null);
  }

  const filteredItems = filterItems(items, filter);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f4f5f7',
        gap: ' 10px',
      }}
    >

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <CreateBoard onAdd={(newItem) => addItem(setItems, newItem)} />
      </Box>

      {/* Mui element for form text field */}
      <TextField
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        placeholder="Filter Boards!..."
        variant='standard'
      ></TextField>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '1em',
        overflowY: 'auto',
        height: '300px',
        wordWrap: 'break-word',
        '&::-webkit-scrollbar': {
          width: '8px',
          backgroundColor: '#f1f1f1',
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'lightseagreen',
          borderRadius: '8px',
          transition: 'background-color 0.3s ease-in-out',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'lightgreen',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: '8px',
        }
      }}>
        {filteredItems.map((item, index) => (
          // Structure to show block grouped content 
          <Card
            variant="outlined"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDrop={(e) => handleDrop(index, e)}
            onDragOver={(e) => e.preventDefault()}
            sx={{
              backgroundColor: 'rgb(248, 248, 154)',
              borderRadius: '8px',
              width: '250px',
              height: '100px',
              padding: '1.1em',
              transition: 'transform 0.3s ease-in, background-color 0.3s ease-in',
              margin: '20px 0px 0px 15px',
              '&:hover': {
                transform: 'scale(1.01)',
              },
              ...(item.checked && {
                backgroundColor: 'rgb(119, 237, 119)',
              }),
              ...(item.held && {
                backgroundColor: 'rgb(115, 191, 238)',
              }),
            }}
          >

            <CardContent sx={{ padding: 0 }}>
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
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
                  <IconButton aria-describedby={id} variant="contained" onClick={(e) => handleClickPopover(e, index)}>
                    <MoreVertIcon sx={buttonStyle} fontSize="small" />
                  </IconButton>
                  {/* Popover to show buttons */}
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
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
                      <IconButton onClick={() => holdItem(setItems, editingIndex)} variant='contained'>
                        <BackHandIcon fontSize="small" sx={buttonStyle} />
                      </IconButton>
                      <IconButton onClick={() => checkItem(setItems, editingIndex)} variant='contained'>
                        <CheckCircleIcon fontSize="small" sx={buttonStyle} />
                      </IconButton>
                      <IconButton onClick={() => deleteItem(setItems, editingIndex)} variant='contained'>
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
    </Box >
  );
};

export default BoardList;
