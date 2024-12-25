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

  // Handle closing of the snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Show notification with a message and severity
  const showNotification = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // Handle delete action
  const handleDelete = () => {
    props.onDelete(props.id);
    showNotification(`${props.type} Deleted`, "error");
  };

  // Handle check action
  const handleCheck = () => {
    props.onCheck(props.id);
    showNotification(`${props.type} Checked`, "success");
  };

  // Handle hold action
  const handleHold = () => {
    props.onHold(props.id);
    showNotification(`${props.type} Held`, "info");
  };

  // Handle edit action
  const handleEdit = () => {
    setEditedContent(null);
    setEditedTitle(null);
    setIsEditing(true);
  };

  // Handle save action
  const handleSave = () => {
    props.onSave(props.id, editedTitle, editedContent);
    setIsEditing(false);
    showNotification(`${props.type} Saved Successfully`, "success");
  };

  // Toggle visibility of buttons
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
