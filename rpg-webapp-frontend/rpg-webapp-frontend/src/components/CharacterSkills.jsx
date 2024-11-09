import React, { useState } from "react";

const CharacterSkills = ({ skills, setSkills }) => {
  const [newSkillName, setNewSkillName] = useState("");

  if (!skills || Object.keys(skills).length === 0) {
    return <p>Ładowanie umiejętności...</p>;
  }

  const baseSkills = Object.entries(skills).filter(
    ([, skillInfo]) => skillInfo.type !== "ADVANCED"
  );
  const customSkills = Object.entries(skills).filter(
    ([, skillInfo]) => skillInfo.type === "ADVANCED"
  );

  const handleAddSkill = () => {
    if (!newSkillName) return;
    setSkills((prevSkills) => ({
      ...prevSkills,
      [newSkillName]: {
        type: "ADVANCED",
        level: "PURCHASED",
      },
    }));
    setNewSkillName("");
  };

  return (
    <div className="character-skills">
      <h2>Umiejętności</h2>

      {/* Display Base Skills */}
      <h3>Umiejętności Bazowe</h3>
      {baseSkills.map(([skillName, skillInfo]) => (
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

      {/* Display Custom Skills */}
      <h3>Zaawansowane Umiejętności</h3>
      {customSkills.map(([skillName, skillInfo]) => (
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

      {/* Form to add new skill */}
      <div className="add-skill-form">
        <input
          type="text"
          placeholder="Nazwa nowego skilla"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
        />
        <button type="button" onClick={handleAddSkill}>
          Dodaj umiejętność
        </button>
      </div>
    </div>
  );
};

export default CharacterSkills;
