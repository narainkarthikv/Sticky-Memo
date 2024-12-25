import React from 'react';
import { Card, CardContent, IconButton, Popover, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackHandIcon from '@mui/icons-material/BackHand';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { holdItem, checkItem, deleteItem } from '../../utils/helper';
import { cardStyles, buttonStyle, typographyStyles, popoverStyles, textFieldStyles } from './styles';

const BoardCard = ({
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
    <Card
      variant="outlined"
      draggable
      onDragStart={() => handleDragStart(index)}
      onDrop={(e) => handleDrop(index, e)}
      onDragOver={(e) => handleDragOver(e)}
      sx={cardStyles(item)}
    >
      <CardContent sx={{ padding: 0 }}>
        <Typography sx={typographyStyles}>
          <>
            {isEditing && editingIndex === index ? (
              <TextField size='small' onChange={(e) => setEditedTitle(e.target.value)} defaultValue={item.title} fullWidth />
            ) :
              (
                <span style={{ fontWeight: 'bolder' }}>{item.title}</span>
              )
            }
          </>
          <>
            <IconButton
              sx={buttonStyle}
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
              <Typography sx={popoverStyles}>
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
                <IconButton onClick={() => holdItem(setItems, editingIndex, setSnackbar, 'Board')} variant="contained">
                  <BackHandIcon fontSize="small" sx={buttonStyle} />
                </IconButton>
                <IconButton onClick={() => checkItem(setItems, editingIndex, setSnackbar, 'Board')} variant="contained">
                  <CheckCircleIcon fontSize="small" sx={buttonStyle} />
                </IconButton>
                <IconButton onClick={() => deleteItem(setItems, editingIndex, setSnackbar, 'Board')} variant="contained">
                  <DeleteIcon fontSize="small" sx={buttonStyle} />
                </IconButton>
              </Typography>
            </Popover>
          </>
        </Typography>
        <Typography sx={textFieldStyles}>
          {isEditing && editingIndex === index ? (
            <TextField
              size='small'
              sx={{ width: '100%' }}
              onChange={(e) => setEditedContent(e.target.value)}
              defaultValue={item.content}
              multiline
              rows={4}
            />
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

export default BoardCard;
