import React, { useState } from 'react';

const CharacterWeapons = ({ weapons = [], setWeapons }) => {
  const [newWeapon, setNewWeapon] = useState({
    name: '',
    category: '',
    strength: '',
    range: '',
    weaponAttributes: '',
  });

  // Funkcja do obsługi zmian w polach nowej broni
  const handleWeaponChange = (e) => {
    const { name, value } = e.target;
    setNewWeapon((prevWeapon) => ({
      ...prevWeapon,
      [name]: value,
    }));
  };

  // Funkcja dodająca nową broń do listy
  const handleAddWeapon = () => {
    setWeapons((prevWeapons) => [...prevWeapons, newWeapon]);
    setNewWeapon({ name: '', category: '', strength: '', range: '', weaponAttributes: '' });
  };

  return (
    <div className="character-weapons">
      {weapons.length > 0 ? (
        <ul>
          {weapons.map((weapon, index) => (
            <li key={index}>
              <strong>{weapon.name}</strong> - {weapon.category}, Siła: {weapon.strength}, Zasięg: {weapon.range}, Atrybuty: {weapon.weaponAttributes}
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak broni do wyświetlenia</p>
      )}

      <h4>Dodaj nową broń</h4>
      <div>
        <label>Nazwa:</label>
        <input
          type="text"
          name="name"
          value={newWeapon.name}
          onChange={handleWeaponChange}
        />
      </div>

      <div>
        <label>Kategoria:</label>
        <input
          type="text"
          name="category"
          value={newWeapon.category}
          onChange={handleWeaponChange}
        />
      </div>

      <div>
        <label>Siła:</label>
        <input
          type="text"
          name="strength"
          value={newWeapon.strength}
          onChange={handleWeaponChange}
        />
      </div>

      <div>
        <label>Zasięg:</label>
        <input
          type="number"
          name="range"
          value={newWeapon.range}
          onChange={handleWeaponChange}
        />
      </div>

      <div>
        <label>Atrybuty:</label>
        <input
          type="text"
          name="weaponAttributes"
          value={newWeapon.weaponAttributes}
          onChange={handleWeaponChange}
        />
      </div>

      <button type="button" onClick={handleAddWeapon}>Dodaj broń</button>
    </div>
  );
};

export default CharacterWeapons;
