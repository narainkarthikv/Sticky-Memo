import React from 'react';
import { FaCheckCircle, FaTrash, FaHandPaper } from 'react-icons/fa';
import '../styles/NoteList.css';

const Note = (props) => {
  const handleDelete = () => {
    props.onDelete(props.id);
  };

  const handleCheck = () => {
    props.onCheck(props.id);
  };

  const handleHold = () => {
    props.onHold(props.id);
  };

  return (
    <div
      className={`note ${props.checked && 'note-checked'} ${props.held && 'note-held'} ${props.isDragging && 'note-dragging'}`}
      draggable
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
    >
      <div className="note-container">
        <h1 className="note-title">{props.title}</h1>
        <p className="note-content">{props.content}</p>
      </div>
      {props.all && (
        <div className="note-buttons">
          <button onClick={handleDelete} className="note-button note-delete-button"><FaTrash /></button>
          <button onClick={handleCheck} className={`note-button ${props.checked && 'note-checked-button'}`}><FaCheckCircle className={`${props.checked && 'note-checked-icon'}`} /></button>
          <button onClick={handleHold} className={`note-button ${props.held && 'note-held-button'}`}><FaHandPaper className={`${props.held && 'note-held-icon'}`} /></button>
        </div>
      )}
    </div>
  );
};

export default Note;
