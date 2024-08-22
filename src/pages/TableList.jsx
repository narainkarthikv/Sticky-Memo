import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import { addItem, deleteItem, checkItem, holdItem } from '../utils/helper';
import CreateRow from '../components/CreateRow';
import Row from '../components/Row';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../styles/TableList.css';

const TableList = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const [filter, setFilter] = useState('');

  // Function to drag and drop the row 
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

  // Filter items based on the filter state
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase()) ||
    item.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="TableList">
        <input
          className="filter-input boards-filter"
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
                <th className="table-head">Actions</th>
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
                  all={item.all}
                  moveRow={moveRow}
                />
              ))}
            </tbody>
          </table>
        </div>
        <CreateRow onAdd={(newItem) => addItem(setItems, newItem)} />
      </div>
    </DndProvider>
  );
};

export default TableList;
