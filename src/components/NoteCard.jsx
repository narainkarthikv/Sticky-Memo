import React from 'react';
import { Card, CardContent, IconButton, Popover, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { holdItem, checkItem, deleteItem } from '../utils/helper';

const NoteCard = ({
  item,
  index,
  isEditing,
  editingIndex,
  editedTitle,
  setEditedTitle,
  editedContent,
  setEditedContent,
  handleEdit,
  handleSave,
  handleClickPopover,
  handleClosePopover,
  anchorEl,
  setAnchorEl,
  handleDragStart,
  handleDrop,
  handleDragOver,
  setItems,
  setSnackbar,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const buttonStyle = {
    color: 'white',
    borderRadius: '100%',
    backgroundColor: '#f66b6b',
    padding: '3px',
  };

  return (
    <Card
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
  );
};

export default NoteCard;
