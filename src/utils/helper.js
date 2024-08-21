export const addItem = (setItems, newItem) => {
    setItems((prevItems) => [
      ...prevItems,
      { ...newItem, checked: false, held: false, all: true },
    ]);
  };
  
  export const deleteItem = (setItems, id) => {
    setItems((prevItems) => prevItems.filter((_, index) => index !== id));
  };
  
  export const checkItem = (setItems, id) => {
    setItems((prevItems) =>
      prevItems.map((item, index) =>
        index === id ? { ...item, checked: !item.checked, held: false } : item
      )
    );
  };
  
  export const holdItem = (setItems, id) => {
    setItems((prevItems) =>
      prevItems.map((item, index) =>
        index === id ? { ...item, held: !item.held, checked: false } : item
      )
    );
  };
  
  export const filterItems = (items, filter) => {
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.content.toLowerCase().includes(filter.toLowerCase())
    );
  };
  