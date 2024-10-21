import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import CreateBoard from '../components/CreateBoard';
import Board from '../components/Board';
import Footer from "../components/Footer"
import { addItem, deleteItem, checkItem, holdItem, filterItems } from '../utils/useItemUtils';
import '../styles/BoardList.css';
import '../styles/utils.css';

const BoardList = () => {
  // State to manage the list of boards using Recoil
  const [items, setItems] = useRecoilState(itemsState);

  // State to manage the filter input value
  const [filter, setFilter] = useState('');

  // State to keep track of the index of the board being dragged
  const [draggingIndex, setDraggingIndex] = useState(null);

  // Function to handle the start of a drag event, storing the index of the dragged board
  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  // Function to handle the drag over event, allowing the board to be dropped
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle the drop event, moving the board to its new position
  const handleDrop = (index, event) => {
    event.preventDefault();
    if (draggingIndex !== null && draggingIndex !== index) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggingIndex, 1); // Remove the dragged board from its original position
      updatedItems.splice(index, 0, draggedItem); // Insert the dragged board at the new position
      setItems(updatedItems);
    }
    setDraggingIndex(null);
  };

  // Function to handle saving changes to a board's title or content
  const handleSave = (id, newTitle, newContent) => {
    const updatedItems = items.map((item, index) =>
      index === id ? { ...item, title: newTitle, content: newContent } : item
    );
    setItems(updatedItems);
  };

  // Use the filterItems function to filter boards based on the filter input value
  const filteredItems = filterItems(items, filter);

  return (
    <div className="board-list">

      {/* Header section with a component to add a new board */}
      <div className="BoardList-header">
        <CreateBoard onAdd={(newItem) => addItem(setItems, newItem)} />
      </div>

      {/* Input to filter boards based on title or content */}
      <input
        className="filter-input"
        placeholder="Filter Boards!..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      
      {/* Container to display the list of filtered boards */}
      <div className="boards-container">
        {filteredItems.map((item, index) => (
          <Board
            key={index}
            id={index}
            title={item.title}
            content={item.content}
            onDelete={() => deleteItem(setItems, index)}
            onCheck={() => checkItem(setItems, index)}
            onHold={() => holdItem(setItems, index)}
            onSave={handleSave}
            checked={item.checked}
            held={item.held}
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(index, event)}
          />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default BoardList;
