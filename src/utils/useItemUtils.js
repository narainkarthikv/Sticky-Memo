import { useState } from 'react';
import { toast } from 'react-toastify';

export const useItemUtils = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [showButtons, setShowButtons] = useState(false);

  const handleDelete = () => {
    props.onDelete(props.id);
    toast.error(`${props.type} Deleted Successfully`);
  };

  const handleCheck = () => {
    props.onCheck(props.id);
  };

  const handleHold = () => {
    props.onHold(props.id);
  };

  const handleEdit = () => {
    setEditedContent(null)
    setEditedTitle(null)
    setIsEditing(true);
  };

  const handleSave = () => {
    props.onSave(props.id, editedTitle, editedContent);
    setIsEditing(false);
  };

  const toggleButtons = () => {
    setShowButtons((prevState) => !prevState);
  };

  return {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    showButtons,
    setShowButtons,
    handleDelete,
    handleCheck,
    handleHold,
    handleEdit,
    handleSave,
    toggleButtons,
  };
};
