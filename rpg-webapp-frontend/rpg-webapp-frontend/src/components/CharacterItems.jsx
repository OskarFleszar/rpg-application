import React, { useState } from "react";

const CharacterItems = ({ items = [], setItems }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
  });

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, newItem]);
    setNewItem({ name: "", description: "" });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="character-items">
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <div>
                <label>Nazwa:</label>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <div>
                <label>Opis:</label>
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </div>
              <button type="button" onClick={() => handleDeleteItem(index)}>
                Usuń
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak</p>
      )}

      <div>
        <label>Nazwa:</label>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleNewItemChange}
        />
      </div>

      <div>
        <label>Opis:</label>
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleNewItemChange}
        />
      </div>

      <button type="button" onClick={handleAddItem}>
        Dodaj
      </button>
    </div>
  );
};

export default CharacterItems;
