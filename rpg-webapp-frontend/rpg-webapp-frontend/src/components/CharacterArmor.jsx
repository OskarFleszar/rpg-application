import React, { useState } from "react";

const CharacterArmor = ({ armor = [], setArmor }) => {
  const [newArmor, setNewArmor] = useState({
    armorType: "",
    location: "",
    armorPoints: "",
  });

  const handleNewArmorChange = (e) => {
    const { name, value } = e.target;
    setNewArmor((prevArmor) => ({
      ...prevArmor,
      [name]: value,
    }));
  };

  const handleAddArmor = () => {
    setArmor((prevArmor) => [...prevArmor, newArmor]);
    setNewArmor({ armorType: "", location: "", armorPoints: "" });
  };

  const handleArmorChange = (index, e) => {
    const { name, value } = e.target;
    setArmor((prevArmor) =>
      prevArmor.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleDeleteArmor = (index) => {
    setArmor((prevArmor) => prevArmor.filter((_, i) => i !== index));
  };

  return (
    <div className="character-armor">
      {armor.length > 0 ? (
        <ul>
          {armor.map((armorItem, index) => (
            <li key={index}>
              <div>
                <label>Typ:</label>
                <input
                  type="text"
                  name="armorType"
                  value={armorItem.armorType}
                  onChange={(e) => handleArmorChange(index, e)}
                />
              </div>
              <div>
                <label>Lokacja:</label>
                <input
                  type="text"
                  name="location"
                  value={armorItem.location}
                  onChange={(e) => handleArmorChange(index, e)}
                />
              </div>
              <div>
                <label>Punkty Zbroi:</label>
                <input
                  type="text"
                  name="armorPoints"
                  value={armorItem.armorPoints}
                  onChange={(e) => handleArmorChange(index, e)}
                />
              </div>
              <button type="button" onClick={() => handleDeleteArmor(index)}>
                Usuń
              </button>
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
          onChange={handleNewArmorChange}
        />
      </div>

      <div>
        <label>Lokacja:</label>
        <input
          type="text"
          name="location"
          value={newArmor.location}
          onChange={handleNewArmorChange}
        />
      </div>

      <div>
        <label>Punkty Zbroi:</label>
        <input
          type="text"
          name="armorPoints"
          value={newArmor.armorPoints}
          onChange={handleNewArmorChange}
        />
      </div>

      <button type="button" onClick={handleAddArmor}>
        Dodaj armor
      </button>
    </div>
  );
};

export default CharacterArmor;
