import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import CreateBoard from '../components/CreateBoard';
import Board from '../components/Board';
import { addItem, deleteItem, checkItem, holdItem } from '../utils/helper';
import '../styles/BoardList.css';

const BoardList = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const [filter, setFilter] = useState('');
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
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

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase()) ||
    item.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="BoardList">
        <input
          className="filter-input boards-filter"
          placeholder="Filter Boards..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      <div className="BoardList-header">
        <CreateBoard onAdd={(newItem) => addItem(setItems, newItem)} />
      </div>
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
    </div>
  );
};

export default BoardList;
