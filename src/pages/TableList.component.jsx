import React from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import { addItem, deleteItem, checkItem, holdItem } from '../utils/helper';
import CreateRow from '../components/CreateRow.component';
import Row from '../components/Row.component';
import '../styles/TableList.component.css';

const TableList = () => {
  const [items, setItems] = useRecoilState(itemsState);

  return (
    <div className="TableList">
      <div className="scrollable-table">
        <table className="table-container">
          <thead>
            <tr>
              <th className="table-head">Title</th>
              <th className="table-head">Content</th>
              <th className="table-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <Row
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
          </tbody>
        </table>
      </div>
      <CreateRow onAdd={(newItem) => addItem(setItems, newItem)} />
    </div>
  );
};

export default TableList;