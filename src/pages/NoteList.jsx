import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import CreateNote from '../components/CreateNote';
import Note from '../components/Note';
import Footer from "../components/Footer"
import { addItem, deleteItem, checkItem, holdItem, filterItems } from '../utils/helper';
import '../styles/NoteList.css';
import '../styles/utils.css';

const NoteList = () => {
  // State to manage the list of notes using Recoil
  const [items, setItems] = useRecoilState(itemsState);

  // State to manage the filter input value
  const [filter, setFilter] = useState('');

  // State to track the index of the note being dragged
  const [draggingIndex, setDraggingIndex] = useState(null);

  // Function to handle the start of a drag event
  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  // Function to handle drag over event, allowing drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle the drop event and update the items array based on the new order
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

  // Function to handle saving changes to a note's title or content
  const handleSave = (id, newTitle, newContent) => {
    const updatedItems = items.map((item, index) =>
      index === id ? { ...item, title: newTitle, content: newContent } : item
    );
    setItems(updatedItems);
  };

  // Filter the notes based on the filter input value
  const filteredItems = filterItems(items, filter);

  return (
    <div className="note-list">
      {/* Section to add a new note and filter existing notes */}
      <div>
        <CreateNote onAdd={(newItem) => addItem(setItems, newItem)} />
        <input
          className="filter-input"
          placeholder="Filter Notes!..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Container displaying the filtered list of notes */}
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
      <Footer/>
    </div>
  );
};

export default NoteList;
