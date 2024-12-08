export const addItem = (setItems, newItem, setSnackbar, context) => {
  if (!newItem.title.trim() || !newItem.content.trim()) {
    // Close the current Snackbar, then show the warning
    setSnackbar({ open: false, message: '', severity: '' });

    setTimeout(() => {
      setSnackbar({
        open: true,
        message: `Don't Waste ${context}s :)`,
        severity: "warning",
      });
    }, 300); // Small delay to ensure the previous notification is unmounted

    // Return early without resetting the state
    return false;
  }

  setItems((prevItems) => [
    ...prevItems,
    { ...newItem, checked: false, held: false, all: true },
  ]);

  // Close the current Snackbar, then show the success message
  setSnackbar({ open: false, message: '', severity: '' });

  setTimeout(() => {
    setSnackbar({
      open: true,
      message: `${context} "${newItem.title}" added successfully!`,
      severity: "success",
    });
  }, 300);

  // Return true to indicate success
  return true;
};


export const deleteItem = (setItems, id, setSnackbar, context) => {
  setItems((prevItems) => prevItems.filter((_, index) => index !== id));

  // Close the current Snackbar, then show the info message
  setSnackbar({ open: false, message: '', severity: '' });

  setTimeout(() => {
    setSnackbar({
      open: true,
      message: `${context} deleted successfully!`,
      severity: "info",
    });
  }, 300); // Allow the old Snackbar to fully unmount
};

export const checkItem = (setItems, id, setSnackbar, context) => {
  setItems((prevItems) =>
    prevItems.map((item, index) =>
      index === id ? { ...item, checked: !item.checked, held: false } : item
    )
  );

  // Close the current Snackbar, then show the success message
  setSnackbar({ open: false, message: '', severity: '' });

  setTimeout(() => {
    setSnackbar({
      open: true,
      message: `${context} checked successfully!`,
      severity: "success",
    });
  }, 300); // Allow the old Snackbar to fully unmount
};

export const holdItem = (setItems, id, setSnackbar, context) => {
  setItems((prevItems) =>
    prevItems.map((item, index) =>
      index === id ? { ...item, held: !item.held, checked: false } : item
    )
  );

  // Close the current Snackbar, then show the warning message
  setSnackbar({ open: false, message: '', severity: '' });

  setTimeout(() => {
    setSnackbar({
      open: true,
      message: `${context} held successfully!`,
      severity: "warning",
    });
  }, 300); // Allow the old Snackbar to fully unmount
};

export const filterItems = (items, filter) => {
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.content.toLowerCase().includes(filter.toLowerCase())
  );
};
