import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTrash, FaHandPaper, FaPlus, FaSave } from 'react-icons/fa';
import '../styles/NoteList.css';

const Note = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  const handleDelete = () => {
    props.onDelete(props.id);
    toast.success('Notes Delete Successfully')
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
              className="note-edit-title" 
            />
            <textarea 
              value={editedContent} 
              onChange={(e) => setEditedContent(e.target.value)} 
              className="note-edit-content"
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
        <div className="note-buttons">
          <button onClick={handleDelete} className="note-button note-delete-button"><FaTrash /></button>
          <button onClick={handleCheck} className={`note-button ${props.checked && 'note-checked-button'}`}><FaCheckCircle className={`${props.checked && 'note-checked-icon'}`} /></button>
          <button onClick={handleHold} className={`note-button ${props.held && 'note-held-button'}`}><FaHandPaper className={`${props.held && 'note-held-icon'}`} /></button>
          {isEditing ? (
            <button onClick={handleSave} className="note-button note-save-button"><FaSave /></button>
          ) : (
            <button onClick={handleEdit} className="note-button note-edit-button"><FaPlus className={`${props.held && 'note-held-icon'}`} /></button>
          )}
        </div>
      )}
    </div>
  );
};

export default Note;
