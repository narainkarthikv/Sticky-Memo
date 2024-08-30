import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import { addItem, deleteItem, checkItem, holdItem } from '../utils/helper';
import CreateRow from '../components/CreateRow';
import Row from '../components/Row';
import '../styles/TableList.css';
import '../styles/utils.css';

const TableList = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const [filter, setFilter] = useState('');

  const moveRow = (dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex];
    const updatedItems = [...items];
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setItems(updatedItems);
  };

  const handleSave = (id, newTitle, newContent) => {
    const updatedItems = items.map((item, index) =>
      index === id ? { ...item, title: newTitle, content: newContent } : item
    );
    setItems(updatedItems);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('text/plain');
    if (dragIndex !== index.toString()) {
      moveRow(parseInt(dragIndex, 10), index);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase()) ||
    item.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="table-list">
      <input
        className="filter-input"
        placeholder="Filter Rows!..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="scrollable-table">
        <table className="table-container">
          <thead className="table-header">
            <tr>
              <th className="table-head">Title</th>
              <th className="table-head">Content</th>
            </tr>
          </thead>
          <tbody>
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
      <CreateRow onAdd={(newItem) => addItem(setItems, newItem)} />
    </div>
  );
};

export default TableList;
