import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import { addItem, deleteItem, checkItem, holdItem, filterItems } from '../utils/helper';
import CreateRow from '../components/CreateRow';
import Footer from "../components/Footer"
import { Box, IconButton, Popover, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useItemUtils } from '../utils/useItemUtils';

const TableList = (props) => {
  // State to manage the list of table rows using Recoil
  const [items, setItems] = useRecoilState(itemsState);

  // State to manage the filter input value
  const [filter, setFilter] = useState('');

  //State for tracking selected board to edit
  const [editingIndex, setEditingIndex] = useState(null);

  //State for popover anchor
  const [anchorEl, setAnchorEl] = useState(null);

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

  // Function to move a row from one position to another in the table
  const moveRow = (dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex];
    const updatedItems = [...items];
    updatedItems.splice(dragIndex, 1); // Remove the dragged item from its original position
    updatedItems.splice(hoverIndex, 0, draggedItem); // Insert the dragged item at the new position
    setItems(updatedItems);
  };

  // Function to handle saving changes to a row's title or content
  const handleSave = (item, id, newTitle, newContent) => {
    setIsEditing(false);

    const updatedItems = items.map((item, index) =>
      index === id ? { ...item, title: newTitle || item.title, content: newContent || item.content } : item
    );
    setItems(updatedItems);
  };

  // Function to handle the start of a drag event, storing the index of the dragged item
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  // Function to handle the drop event, moving the row to its new position
  const handleDrop = (e, index) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('text/plain');
    if (dragIndex !== index.toString()) {
      moveRow(parseInt(dragIndex, 10), index);
    }
  };

  // Filter the rows based on the filter input value
  const filteredItems = filterItems(items, filter);


  const handleClickPopover = (event, index) => {
    setEditingIndex(index);
    setAnchorEl(event.currentTarget);
  }
  const handleClosePopover = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >

      {/* Component to add a new row to the table */}
      <CreateRow onAdd={(newItem) => addItem(setItems, newItem)} />

      {/* Input to filter rows based on title or content */}
      <TextField
        sx={{ margin: '1.3em' }}
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        placeholder="Filter Rows!..."
        variant='standard'
      ></TextField>


      {/* Scrollable table container */}
      <Box
        sx={{
          height: '400px',
          width: '90%',
          overflowY: 'auto',
          margin: '0 auto',
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
          },
        }}
      >
        <Table
          sx={{
            width: '90%',
            display: 'table',
            margin: 'auto'
          }}
        >
          <TableHead sx={{ backgroundColor: 'black' }}>
            <TableRow>
              <TableCell align='center'
                sx={{
                  fontWeight: 'bold !important',
                  color: 'white !important',
                  backgroundColor: 'black',
                }}
              >Title
              </TableCell>
              <TableCell align='center'
                sx={{
                  fontWeight: 'bold !important',
                  color: 'white !important',
                  backgroundColor: 'black',
                }}
              >Content
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow
                key={index}
                id={index}
                sx={{
                  color: 'black',
                  backgroundColor: item.checked
                    ? 'rgb(119, 237, 119)'
                    : item.held
                      ? 'rgb(115, 191, 238)'
                      : 'rgb(248, 248, 154)',
                  width: '100%',
                  height: 'auto',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.3s ease-in, background-color 0.3s ease-in',
                  '&:hover': {
                    transform: 'scale(1.01)',
                  },
                }}
              >
                <TableCell align='center' draggable onDragStart={(e) => handleDragStart(e, index)} onDrop={(e) => handleDrop(e, index)} onDragOver={(e) => e.preventDefault()}>
                  {isEditing && editingIndex === index ? (
                    <TextField onChange={(e) => setEditedTitle(e.target.value)} defaultValue={item.title} ></TextField>
                  ) :
                    (
                      <span>{item.title}</span>
                    )
                  }
                </TableCell>
                <TableCell align='center' draggable onDragStart={(e) => handleDragStart(e, index)} onDrop={(e) => handleDrop(e, index)} onDragOver={(e) => e.preventDefault()}>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box style={{ alignSelf: 'center', wordBreak: ' break-all' }}>
                      {isEditing && editingIndex === index ? (
                        <TextField onChange={(e) => setEditedContent(e.target.value)}
                          defaultValue={item.content}
                        ></TextField>
                      ) :
                        (
                          <span>{item.content}</span>
                        )
                      }
                    </Box>
                    <IconButton aria-describedby={id} variant="contained" onClick={(e) => handleClickPopover(e, index)}>
                      <MoreVertIcon sx={buttonStyle} fontSize="small" />
                    </IconButton>
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
                      <Typography sx={{
                        backgroundColor: '#3498db',
                        padding: '0.5',
                        alignSelf: 'end'
                      }}>
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
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box >

      <Footer />
    </Box >
  );
};

export default TableList;
