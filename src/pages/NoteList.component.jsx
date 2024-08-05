import React from 'react';
import { useRecoilState } from 'recoil';
import { itemsState } from '../utils/state';
import CreateArea from '../components/CreateArea.component';
import Note from '../components/Note.component';
import '../styles/NoteList.component.css';
import { addItem, deleteItem, checkItem, holdItem } from '../utils/helper';
// import FilterNotes from '../components/FilterNotes.component';

const NoteList = () => {
  const [items, setItems] = useRecoilState(itemsState);

  return (
    <div className="NoteList">
      <div className="create-and-filter-container">
        <CreateArea onAdd={(newItem) => addItem(setItems, newItem)} />
        {/* <FilterNotes items={items} /> */}
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;