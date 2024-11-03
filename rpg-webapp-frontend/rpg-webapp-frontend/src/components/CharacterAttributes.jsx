import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CharacterAttributes = ({ character, setCharacter }) => {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/character/default-attributes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const initialAttributes = Object.entries(response.data.attributes).map(([key, value]) => ({
          name: key,
          baseValue: value.baseValue || 0,
          advancementPoints: value.advancementPoints || 0,
          currentValue: value.currentValue || 0,
        }));
        setAttributes(initialAttributes);
      } catch (error) {
        console.error("Błąd przy pobieraniu domyślnych atrybutów:", error);
      }
    };

    fetchAttributes();
  }, []);

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = attributes.map((attr, i) =>
      i === index
        ? {
            ...attr,
            [field]: parseInt(value) || 0
          }
        : attr
    );

    setAttributes(updatedAttributes);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      attributes: updatedAttributes,
    }));
  };

  return (
    <div className="character-attributes">
      <h2>Atrybuty</h2>
      {attributes.map((attr, index) => (
        <div key={attr.name} className="attribute-row">
          <label>{attr.name}</label>
          <div className="attribute-inputs">
            <input
              type="number"
              placeholder="Base"
              value={attr.baseValue}
              onChange={(e) => handleAttributeChange(index, 'baseValue', e.target.value)}
            />
            <input
              type="number"
              placeholder="Advancement"
              value={attr.advancementPoints}
              onChange={(e) => handleAttributeChange(index, 'advancementPoints', e.target.value)}
            />
            <input
              type="number"
              placeholder="Current"
              value={attr.currentValue}
              onChange={(e) => handleAttributeChange(index, 'currentValue', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterAttributes;
