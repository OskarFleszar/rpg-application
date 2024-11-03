import React, { useState } from 'react';

const CharacterItems = ({ items = [], setItems }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
  });

  // Funkcja do obsługi zmian w polach nowej broni
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Funkcja dodająca nową broń do listy
  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, newItem]);
    setNewItem({ name: '', description: '' });
  };

  return (
    <div className="character-items">
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> : {item.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak </p>
      )}

      <div>
        <label>Nazwa:</label>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleItemChange}
        />
      </div>

      <div>
        <label>Opis:</label>
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleItemChange}
        />
      </div>

     

      <button type="button" onClick={handleAddItem}>Dodaj</button>
    </div>
  );
};

export default CharacterItems;
