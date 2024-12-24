import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import CreateRow from '../components/CreateRow';
import Footer from "../components/Footer";
import TableCard from '../components/TableCard';
import CommonFilter from '../components/CommonFilter';
import CommonSnackbar from '../components/CommonSnackbar';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { addItem, filterItems } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';

const TableList = (props) => {
  const [items, setItems] = useRecoilState(itemsState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [filter, setFilter] = useState('');
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    handleEdit,
  } = useItemUtils({ ...props, type: 'Row' });

  const handleDragStart = (index) => setDraggingIndex(index);
  const handleDragOver = (event) => event.preventDefault();
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

  const filteredItems = filterItems(items, filter);
  const handleClickPopover = (event, index) => {
    setEditingIndex(index);
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f5f7', gap: '10px' }}>
      <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CreateRow onAdd={(newItem) => addItem(setItems, newItem, setSnackbar, "Row")} />
      </Box>
      <CommonFilter filter={filter} setFilter={setFilter} />
      <Box
        sx={{
          height: '400px',
          width: '90%',
          overflowY: 'auto',
          margin: '0 auto',
          '&::-webkit-scrollbar': { width: '8px', backgroundColor: '#f1f1f1', borderRadius: '8px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'lightseagreen', borderRadius: '8px', transition: 'background-color 0.3s ease-in-out' },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'lightgreen' },
          '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '8px' },
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
              <TableCell align='center' sx={{ fontWeight: 'bold !important', color: 'white !important', backgroundColor: 'black' }}>Title</TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold !important', color: 'white !important', backgroundColor: 'black' }}>Content</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableCard
                key={index}
                item={item}
                index={index}
                isEditing={isEditing}
                editingIndex={editingIndex}
                editedTitle={editedTitle}
                setEditedTitle={setEditedTitle}
                editedContent={editedContent}
                setEditedContent={setEditedContent}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleClickPopover={handleClickPopover}
                handleClosePopover={handleClosePopover}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                setItems={setItems}
                setSnackbar={setSnackbar}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
      <Footer />
    </Box>
  );
};

export default TableList;
