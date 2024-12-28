import React from 'react';
import { TableRow, TableCell, IconButton, Popover, TextField, Typography, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { holdItem, checkItem, deleteItem } from '../../utils/helper';
import { tableRowStyles, buttonStyle, boxStyles, contentBoxStyles, popoverTypographyStyles } from './styles'; // Import specific styles

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

  return (
    <TableRow
      key={index}
      id={index}
      draggable
      onDragStart={(e) => handleDragStart(index)}
      onDrop={(e) => handleDrop(index, e)}
      onDragOver={(e) => handleDragOver(e)}
      sx={tableRowStyles(item)} // Apply the styles
    >
      <TableCell align='center'>
        {isEditing && editingIndex === index ? (
          <TextField onChange={(e) => setEditedTitle(e.target.value)} defaultValue={item.title} fullWidth />
        ) : (
          <span>{item.title}</span>
        )}
      </TableCell>
      <TableCell align='center'>
        <Box sx={boxStyles}>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flex: { xs: '1 1 50%', sm: '1 1 66%' } }}>
              {isEditing && editingIndex === index ? (
                <TextField onChange={(e) => setEditedContent(e.target.value)} defaultValue={item.content} fullWidth multiline rows={4} />
              ) : (
                <span>{item.content}</span>
              )}
            </Box>
            <Box sx={{ flex: { xs: '1 1 50%', sm: '1 1 33%' }, display: 'flex', justifyContent: 'flex-end' }}>
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
                <Typography sx={popoverTypographyStyles}>
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
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableCard;
