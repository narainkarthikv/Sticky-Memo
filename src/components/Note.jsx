import React from 'react';
import { FaCheckCircle, FaTrash, FaHandPaper, FaEdit, FaSave, FaEllipsisV } from 'react-icons/fa';
import { useItemUtils } from '../utils/useItemUtils';
import '../styles/NoteList.css';
import '../styles/Button.css';

const Note = (props) => {
  const {
    isEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    showButtons,
    handleDelete,
    handleCheck,
    handleHold,
    handleEdit,
    handleSave,
    toggleButtons,
  } = useItemUtils({ ...props, type: 'Note' });

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
          <>
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
          </>
        ) : (
          <>
            <h1 className="note-title">{props.title}</h1>
            <p className="note-content">{props.content}</p>
          </>
        )}
        <button onClick={toggleButtons} className="note-ellipse-btn">
          <FaEllipsisV />
        </button>
      </div>
      {showButtons && (
        <div className={`Note-btns ${showButtons ? 'show' : ''}`}>
          <button onClick={handleDelete} className="Item-btn Item-delete-btn">
            <FaTrash />
          </button>
          <button onClick={handleCheck} className="Item-btn Item-checked-btn">
            <FaCheckCircle />
          </button>
          <button onClick={handleHold} className="Item-btn Item-held-btn">
            <FaHandPaper />
          </button>
          {isEditing ? (
            <button onClick={handleSave} className="Item-btn Item-save-btn">
              <FaSave />
            </button>
          ) : (
            <button onClick={handleEdit} className="Item-btn Item-edit-btn">
              <FaEdit />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Note;
