import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTrash, FaHandPaper, FaEdit, FaSave, FaEllipsisV } from 'react-icons/fa';
import '../styles/BoardList.css';

const Board = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [showButtons, setShowButtons] = useState(false);

  const handleDelete = () => {
    props.onDelete(props.id);
    toast.error('Board Deleted Successfully');
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

  const toggleButtons = () => {
    setShowButtons((prevState) => !prevState);
  };

  return (
    <div
      className={`Board ${props.checked ? 'Checked-Board' : ''} ${props.held ? 'Held-Board' : ''}`}
      draggable
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
    >
      <div className="Board-header">
        {isEditing ? (
          <input 
            type="text" 
            value={editedTitle} 
            onChange={(e) => setEditedTitle(e.target.value)} 
            className="Board-title-input" 
          />
        ) : (
          <h3 className="Board-title">{props.title}</h3>
        )}
        <button onClick={toggleButtons} className="Board-ellipse-btn">
          <FaEllipsisV />
        </button>
      </div>
      <div className="Board-body">
        {isEditing ? (
          <textarea 
            value={editedContent} 
            onChange={(e) => setEditedContent(e.target.value)} 
            className="Board-content-input"
          />
        ) : (
          <p className="Board-content">{props.content}</p>
        )}
      </div>
      {showButtons && (
        <div className={`Board-btns ${showButtons ? 'show' : ''}`}>
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

export default Board;
