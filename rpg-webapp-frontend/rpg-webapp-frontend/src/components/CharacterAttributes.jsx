import React from "react";

const CharacterAttributes = ({ attributes, setAttributes }) => {
  // Sprawdzenie, czy `attributes` zawiera dane
  if (!attributes || Object.keys(attributes).length === 0) {
    return <p>Ładowanie atrybutów...</p>;
  }

  const handleAttributeChange = (name, field, value) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [name]: {
        ...prevAttributes[name],
        [field]: parseInt(value) || 0,
      },
    }));
  };

  return (
    <div className="character-attributes">
      <h2>Atrybuty</h2>
      {/* Renderowanie atrybutów */}
      {Object.entries(attributes).map(([key, attr]) => (
        <div key={key} className="attribute-row">
          <label>{key}</label>
          <div className="attribute-inputs">
            <input
              type="number"
              placeholder="Base"
              value={attr.baseValue || 0}
              onChange={(e) =>
                handleAttributeChange(key, "baseValue", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Advancement"
              value={attr.advancementPoints || 0}
              onChange={(e) =>
                handleAttributeChange(key, "advancementPoints", e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Current"
              value={attr.currentValue || 0}
              onChange={(e) =>
                handleAttributeChange(key, "currentValue", e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterAttributes;
