import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import Board from '../components/Board';
import CreateBoard from '../components/CreateBoard';
import '../styles/BoardList.css';
import { addItem, deleteItem, checkItem, holdItem } from '../utils/helper';

const BoardList = () => {
  const [items, setItems] = useRecoilState(itemsState);
  const [filter, setFilter] = useState('');
  const [heldItems, setHeldItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.content.toLowerCase().includes(filter.toLowerCase())
    );

    setAllItems(filteredItems.map((item) => ({ ...item, all: true })));
    setHeldItems(filteredItems.filter((item) => item.held));
    setCheckedItems(filteredItems.filter((item) => item.checked));
  }, [items, filter]);

  return (
    <div className="BoardList">
      <input
        className="filter-input boards-filter"
        placeholder="Filter Boards!..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="BoardListTable">
        <div className="all-boards">
          <h4 className="BoardList-header">Boards</h4>
          {allItems.map((item, index) => (
            <Board
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
            />
          ))}
        </div>
        
        <div className="held-boards">
          <h4 className="BoardList-header">Held Boards</h4>
          {heldItems.map((item, index) => (
            <Board
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
            />
          ))}
        </div>
        <div className="checked-boards">
          <h4 className="BoardList-header">Checked Boards</h4>
          {checkedItems.map((item, index) => (
            <Board
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
            />
          ))}
        </div>
      </div>
      <CreateBoard onAdd={(newItem) => addItem(setItems, newItem)} />
    </div>
  );
};

export default BoardList;
