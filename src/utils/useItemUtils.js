import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const useItemUtils = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [showButtons, setShowButtons] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // Can be "success", "error", "info", or "warning"
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showNotification = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleDelete = () => {
    props.onDelete(props.id);
    showNotification(`${props.type} Deleted`, "error");
  };

  const handleCheck = () => {
    props.onCheck(props.id);
    showNotification(`${props.type} Checked`, "success");
  };

  const handleHold = () => {
    props.onHold(props.id);
    showNotification(`${props.type} Held`, "info");
  };

  const handleEdit = () => {
    setEditedContent(null);
    setEditedTitle(null);
    setIsEditing(true);
  };

  const handleSave = () => {
    props.onSave(props.id, editedTitle, editedContent);
    setIsEditing(false);
    showNotification(`${props.type} Saved Successfully`, "success");
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
    snackbarComponent: function SnackbarComponent() {
      return Snackbar({
        open: snackbar.open,
        autoHideDuration: 3000,
        onClose: handleSnackbarClose,
        anchorOrigin: { vertical: "top", horizontal: "right" },
        children: Alert({
          onClose: handleSnackbarClose,
          severity: snackbar.severity,
          sx: { width: "100%" },
          children: snackbar.message,
        }),
      });
    },
  };
};
