import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import CreateNote from '../components/CreateNote';
import Note from '../components/Note';
import { addItem, deleteItem, checkItem, holdItem } from '../utils/helper';
import '../styles/NoteList.css';

const NoteList = () => {
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

  // Filter notes based on the filter state
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase()) ||
    item.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="note-list">
      <div>
        <CreateNote onAdd={(newItem) => addItem(setItems, newItem)} />
        <input
          className="filter-input"
          placeholder="Filter Notes!..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="notes-container">
        {filteredItems.map((item, index) => (
          <Note
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
            all={item.all}
            isDragging={draggingIndex === index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => handleDragOver(event)}
            onDrop={(event) => handleDrop(index, event)}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
