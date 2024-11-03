import React, { useState } from 'react';

const CharacterArmor = ({ armor = [], setArmor }) => {
  const [newArmor, setNewArmor] = useState({
    armorType: '',
    location: '',
    armorPoints: ''
  });

  
  const handleArmorChange = (e) => {
    const { name, value } = e.target;
    setNewArmor((prevArmor) => ({
      ...prevArmor,
      [name]: value,
    }));
  };

  
  const handleAddArmor = () => {
    setArmor((prevArmor) => [...prevArmor, newArmor]);
    setNewArmor({ armorType: '', location: '', armorPoints: '' });
  };

  return (
    <div className="character-armor">
      {armor.length > 0 ? (
        <ul>
          {armor.map((armor, index) => (
            <li key={index}>
              <strong>{armor.armorType}</strong> - {armor.location}, Punkty pancerza: {armor.armorPoints}
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak Zbroi do wyświetlenia</p>
      )}

      <h4>Dodaj nową zbroje</h4>
      <div>
        <label>Typ:</label>
        <input
          type="text"
          name="armorType"
          value={newArmor.armorType}
          onChange={handleArmorChange}
        />
      </div>

      <div>
        <label>Lokacja:</label>
        <input
          type="text"
          name="location"
          value={newArmor.location}
          onChange={handleArmorChange}
        />
      </div>

      <div>
        <label>Punkty Zbroi:</label>
        <input
          type="text"
          name="armorPoints"
          value={newArmor.armorPoints}
          onChange={handleArmorChange}
        />
      </div>

      <button type="button" onClick={handleAddArmor}>Dodaj armor</button>
    </div>
  );
};

export default CharacterArmor;
