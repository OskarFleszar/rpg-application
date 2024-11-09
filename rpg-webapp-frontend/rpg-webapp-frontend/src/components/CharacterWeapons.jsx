import React, { useState } from "react";

const CharacterWeapons = ({ weapons = [], setWeapons }) => {
  const [newWeapon, setNewWeapon] = useState({
    name: "",
    category: "",
    strength: "",
    range: "",
    weaponAttributes: "",
  });

  const handleNewWeaponChange = (e) => {
    const { name, value } = e.target;
    setNewWeapon((prevWeapon) => ({
      ...prevWeapon,
      [name]: value,
    }));
  };

  const handleAddWeapon = () => {
    setWeapons((prevWeapons) => [...prevWeapons, newWeapon]);
    setNewWeapon({
      name: "",
      category: "",
      strength: "",
      range: "",
      weaponAttributes: "",
    });
  };

  const handleWeaponChange = (index, e) => {
    const { name, value } = e.target;
    setWeapons((prevWeapons) =>
      prevWeapons.map((weapon, i) =>
        i === index ? { ...weapon, [name]: value } : weapon
      )
    );
  };

  const handleDeleteWeapon = (index) => {
    setWeapons((prevWeapons) => prevWeapons.filter((_, i) => i !== index));
  };

  return (
    <div className="character-weapons">
      {weapons.length > 0 ? (
        <ul>
          {weapons.map((weapon, index) => (
            <li key={index}>
              <div>
                <label>Nazwa:</label>
                <input
                  type="text"
                  name="name"
                  value={weapon.name}
                  onChange={(e) => handleWeaponChange(index, e)}
                />
              </div>
              <div>
                <label>Kategoria:</label>
                <input
                  type="text"
                  name="category"
                  value={weapon.category}
                  onChange={(e) => handleWeaponChange(index, e)}
                />
              </div>
              <div>
                <label>Siła:</label>
                <input
                  type="text"
                  name="strength"
                  value={weapon.strength}
                  onChange={(e) => handleWeaponChange(index, e)}
                />
              </div>
              <div>
                <label>Zasięg:</label>
                <input
                  type="number"
                  name="range"
                  value={weapon.range}
                  onChange={(e) => handleWeaponChange(index, e)}
                />
              </div>
              <div>
                <label>Atrybuty:</label>
                <input
                  type="text"
                  name="weaponAttributes"
                  value={weapon.weaponAttributes}
                  onChange={(e) => handleWeaponChange(index, e)}
                />
              </div>
              <button type="button" onClick={() => handleDeleteWeapon(index)}>
                Usuń
              </button>
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
          onChange={handleNewWeaponChange}
        />
      </div>

      <div>
        <label>Kategoria:</label>
        <input
          type="text"
          name="category"
          value={newWeapon.category}
          onChange={handleNewWeaponChange}
        />
      </div>

      <div>
        <label>Siła:</label>
        <input
          type="text"
          name="strength"
          value={newWeapon.strength}
          onChange={handleNewWeaponChange}
        />
      </div>

      <div>
        <label>Zasięg:</label>
        <input
          type="number"
          name="range"
          value={newWeapon.range}
          onChange={handleNewWeaponChange}
        />
      </div>

      <div>
        <label>Atrybuty:</label>
        <input
          type="text"
          name="weaponAttributes"
          value={newWeapon.weaponAttributes}
          onChange={handleNewWeaponChange}
        />
      </div>

      <button type="button" onClick={handleAddWeapon}>
        Dodaj broń
      </button>
    </div>
  );
};

export default CharacterWeapons;
