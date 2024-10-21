import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import CreateBoard from '../components/CreateBoard';
import Board from '../components/Board';
import Footer from "../components/Footer";
import { addItem, deleteItem, checkItem, holdItem, filterItems } from '../utils/helper';
import '../styles/BoardList.css';
import '../styles/utils.css';

const BoardList = () => {
  const [items, setItems] = useRecoilState(itemsState); // State for boards
  const [filter, setFilter] = useState(''); // State for filtering boards
  const [draggingIndex, setDraggingIndex] = useState(null); // State for tracking dragged board

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

  const handleSave = (id, newTitle, newContent) => {
    const updatedItems = items.map((item, index) =>
      index === id ? { ...item, title: newTitle, content: newContent } : item
    );
    setItems(updatedItems);
  };

  const filteredItems = filterItems(items, filter);

  return (
    <div className="board-list">
      <div className="BoardList-header">
        <CreateBoard onAdd={(newItem) => addItem(setItems, newItem)} />
      </div>
      <input
        className="filter-input"
        placeholder="Filter Boards!..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
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
            onDragOver={(e) => e.preventDefault()}
            onDrop={(event) => handleDrop(index, event)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default BoardList;
