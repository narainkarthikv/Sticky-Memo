import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import { addItem, deleteItem, checkItem, holdItem, filterItems } from '../utils/helper';
import CreateRow from '../components/CreateRow';
import Row from '../components/Row';
import '../styles/TableList.css';
import '../styles/utils.css';

const TableList = () => {
  // State to manage the list of table rows using Recoil
  const [items, setItems] = useRecoilState(itemsState);

  // State to manage the filter input value
  const [filter, setFilter] = useState('');

  // Function to move a row from one position to another in the table
  const moveRow = (dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex];
    const updatedItems = [...items];
    updatedItems.splice(dragIndex, 1); // Remove the dragged item from its original position
    updatedItems.splice(hoverIndex, 0, draggedItem); // Insert the dragged item at the new position
    setItems(updatedItems);
  };

  // Function to handle saving changes to a row's title or content
  const handleSave = (id, newTitle, newContent) => {
    const updatedItems = items.map((item, index) =>
      index === id ? { ...item, title: newTitle, content: newContent } : item
    );
    setItems(updatedItems);
  };

  // Function to handle the start of a drag event, storing the index of the dragged item
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  // Function to handle the drop event, moving the row to its new position
  const handleDrop = (e, index) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('text/plain');
    if (dragIndex !== index.toString()) {
      moveRow(parseInt(dragIndex, 10), index);
    }
  };

  // Filter the rows based on the filter input value
  const filteredItems = filterItems(items, filter);

  return (
    <div className="table-list">

      {/* Component to add a new row to the table */}
      <CreateRow onAdd={(newItem) => addItem(setItems, newItem)} />
      
      {/* Input to filter rows based on title or content */}
      <input
        className="filter-input"
        placeholder="Filter Rows!..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      
      {/* Scrollable table container */}
      <div className="scrollable-table">
        <table className="table-container">
          <thead className="table-header">
            <tr>
              <th className="table-head">Title</th>
              <th className="table-head">Content</th>
            </tr>
          </thead>
          <tbody>
            {/* Render filtered rows, making each row draggable */}
            {filteredItems.map((item, index) => (
              <Row
                key={index}
                id={index}
                index={index}
                title={item.title}
                content={item.content}
                onDelete={() => deleteItem(setItems, index)}
                onCheck={() => checkItem(setItems, index)}
                onHold={() => holdItem(setItems, index)}
                onSave={handleSave}
                checked={item.checked}
                held={item.held}
                onDragStart={handleDragStart}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, index)}
              />
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TableList;
