/**
 * Adds a new item to the list.
 * @param {Function} setItems - Function to update the items state.
 * @param {Object} newItem - The new item to be added.
 * @param {Function} setSnackbar - Function to update the snackbar state.
 * @param {string} context - Context of the item (e.g., "Note").
 * @returns {boolean} - Returns true if the item was added successfully, false otherwise.
 */
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
      message: `${context} added!`,
      severity: "success",
    });
  }, 300);

  // Return true to indicate success
  return true;
};

/**
 * Deletes an item from the list.
 * @param {Function} setItems - Function to update the items state.
 * @param {number} id - The index of the item to be deleted.
 * @param {Function} setSnackbar - Function to update the snackbar state.
 * @param {string} context - Context of the item (e.g., "Note").
 */
export const deleteItem = (setItems, id, setSnackbar, context) => {
  setItems((prevItems) => prevItems.filter((_, index) => index !== id));

  // Close the current Snackbar, then show the info message
  setSnackbar({ open: false, message: '', severity: '' });

  setTimeout(() => {
    setSnackbar({
      open: true,
      message: `${context} deleted`,
      severity: "error",
    });
  }, 300); // Allow the old Snackbar to fully unmount
};

/**
 * Toggles the checked state of an item.
 * @param {Function} setItems - Function to update the items state.
 * @param {number} id - The index of the item to be checked.
 * @param {Function} setSnackbar - Function to update the snackbar state.
 * @param {string} context - Context of the item (e.g., "Note").
 */
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
      message: `${context} checked!`,
      severity: "success",
    });
  }, 300); // Allow the old Snackbar to fully unmount
};

/**
 * Toggles the held state of an item.
 * @param {Function} setItems - Function to update the items state.
 * @param {number} id - The index of the item to be held.
 * @param {Function} setSnackbar - Function to update the snackbar state.
 * @param {string} context - Context of the item (e.g., "Note").
 */
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
      message: `${context} held!`,
      severity: "info",
    });
  }, 300); // Allow the old Snackbar to fully unmount
};

/**
 * Filters items based on a search query.
 * @param {Array} items - The list of items to be filtered.
 * @param {string} filter - The search query.
 * @returns {Array} - The filtered list of items.
 */
export const filterItems = (items, filter) => {
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.content.toLowerCase().includes(filter.toLowerCase())
  );
};
