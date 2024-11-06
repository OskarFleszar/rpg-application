import React from "react";

const CharacterSkills = ({ skills, setSkills }) => {
  if (!skills || Object.keys(skills).length === 0) {
    return <p>Ładowanie umiejętności...</p>;
  }

  return (
    <div className="character-skills">
      <h2>Umiejętności</h2>
      {Object.entries(skills).map(([skillName, skillInfo]) => (
        <div key={skillName} className="skill-row">
          <label>{skillName}</label>
          <div className="skill-options">
            {["NOT_PURCHASED", "PURCHASED", "PLUS_10", "PLUS_20"].map(
              (level) => {
                const isChecked = skillInfo.level === level;

                return (
                  <label key={level}>
                    <input
                      type="radio"
                      name={skillName}
                      value={level}
                      checked={isChecked}
                      onChange={() => {
                        setSkills((prevSkills) => ({
                          ...prevSkills,
                          [skillName]: {
                            ...prevSkills[skillName],
                            level: level,
                          },
                        }));
                      }}
                    />
                    {level.replace("_", " ")}
                  </label>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterSkills;
