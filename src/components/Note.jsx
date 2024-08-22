import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTrash, FaHandPaper, FaPlus, FaSave } from 'react-icons/fa';
import '../styles/NoteList.css';
import '../styles/Button.css';

const Note = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  const handleDelete = () => {
    props.onDelete(props.id);
    toast.error('Note Deleted Successfully');
  };

  const handleCheck = () => {
    props.onCheck(props.id);
  };

  const handleHold = () => {
    props.onHold(props.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    props.onSave(props.id, editedTitle, editedContent);
    setIsEditing(false);
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
        {isEditing ? (
          <div>
            <input 
              type="text" 
              value={editedTitle} 
              onChange={(e) => setEditedTitle(e.target.value)} 
              className="note-title" 
            />
            <textarea 
              value={editedContent} 
              onChange={(e) => setEditedContent(e.target.value)} 
              className="note-content"
            />
          </div>
        ) : (
          <>
            <h1 className="note-title">{props.title}</h1>
            <p className="note-content">{props.content}</p>
          </>
        )}
      </div>
      {props.all && (
        <div className="Item-btns">
          <button onClick={handleDelete} className="Item-btn Item-delete-btn"><FaTrash /></button>
          <button onClick={handleCheck} className="Item-btn Item-checked-btn"><FaCheckCircle /></button>
          <button onClick={handleHold} className="Item-btn Item-held-btn"><FaHandPaper /></button>
          {isEditing ? (
            <button onClick={handleSave} className="Item-btn Item-save-btn"><FaSave /></button>
          ) : (
            <button onClick={handleEdit} className="Item-btn Item-edit-btn"><FaPlus /></button>
          )}
        </div>
      )}
    </div>
  );
};

export default Note;
