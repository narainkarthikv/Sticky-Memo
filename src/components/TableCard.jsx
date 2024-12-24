import React from 'react';
import { TableRow, TableCell, IconButton, Popover, TextField, Typography, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { holdItem, checkItem, deleteItem } from '../utils/helper';

const TableCard = ({
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
    <TableRow
      key={index}
      id={index}
      draggable
      onDragStart={(e) => handleDragStart(index)}
      onDrop={(e) => handleDrop(index, e)}
      onDragOver={(e) => handleDragOver(e)}
      sx={{
        color: 'black',
        backgroundColor: item.checked ? 'rgb(119, 237, 119)' : item.held ? 'rgb(115, 191, 238)' : 'rgb(248, 248, 154)',
        width: '100%',
        height: 'auto',
        position: 'relative',
        zIndex: 1,
        transition: 'transform 0.3s ease-in, background-color 0.3s ease-in',
        '&:hover': { transform: 'scale(1.01)' },
      }}
    >
      <TableCell align='center'>
        {isEditing && editingIndex === index ? (
          <TextField onChange={(e) => setEditedTitle(e.target.value)} defaultValue={item.title} fullWidth />
        ) : (
          <span>{item.title}</span>
        )}
      </TableCell>
      <TableCell align='center'>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box style={{ alignSelf: 'center', wordBreak: 'break-all' }}>
            {isEditing && editingIndex === index ? (
              <TextField onChange={(e) => setEditedContent(e.target.value)} defaultValue={item.content} fullWidth multiline rows={4} />
            ) : (
              <span>{item.content}</span>
            )}
          </Box>
          <IconButton aria-describedby={id} variant="contained" onClick={(e) => handleClickPopover(e, index)}>
            <MoreVertIcon sx={buttonStyle} fontSize="small" />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Typography sx={{ backgroundColor: '#3498db', padding: '0.5', display: 'flex', justifyContent: 'space-around' }}>
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
              <IconButton onClick={() => holdItem(setItems, editingIndex, setSnackbar, 'Row')} variant="contained">
                <BackHandIcon fontSize="small" sx={buttonStyle} />
              </IconButton>
              <IconButton onClick={() => checkItem(setItems, editingIndex, setSnackbar, 'Row')} variant="contained">
                <CheckCircleIcon fontSize="small" sx={buttonStyle} />
              </IconButton>
              <IconButton onClick={() => deleteItem(setItems, editingIndex, setSnackbar, 'Row')} variant="contained">
                <DeleteIcon fontSize="small" sx={buttonStyle} />
              </IconButton>
            </Typography>
          </Popover>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableCard;
