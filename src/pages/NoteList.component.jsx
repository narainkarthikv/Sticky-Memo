import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import CreateArea from '../components/CreateArea.component';
import Note from '../components/Note.component';
import '../styles/NoteList.component.css';
import { addItem, deleteItem, checkItem, holdItem } from '../utils/helper';

const NoteList = () => {
  const [items, setItems] = useRecoilState(itemsState);
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

  return (
    <div className="NoteList">
      <div className="create-and-filter-container">
        <CreateArea onAdd={(newItem) => addItem(setItems, newItem)} />
      </div>
      <div className="notes-container">
        <div className="notes">
          {items.map((item, index) => (
            <Note
              key={index}
              id={index}
              title={item.title}
              content={item.content}
              onDelete={() => deleteItem(setItems, index)}
              onCheck={() => checkItem(setItems, index)}
              onHold={() => holdItem(setItems, index)}
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
    </div>
  );
};

export default NoteList;
