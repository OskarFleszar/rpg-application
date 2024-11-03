import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterSkills = ({ character, setCharacter }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/character/default-skills', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const initialSkills = Object.entries(response.data.skills).map(([skillName, skillInfo]) => ({
          skillName,
          skillLevel: skillInfo.level,
          skillType: skillInfo.type,
        }));
        setSkills(initialSkills);
      } catch (error) {
        console.error("Błąd przy pobieraniu umiejętności:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillChange = (skillName, level) => {
    const updatedSkills = skills.map((skill) =>
      skill.skillName === skillName ? { ...skill, skillLevel: level } : skill
    );

    setSkills(updatedSkills);
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      skills: updatedSkills,
    }));
  };

  return (
    <div className="character-skills">
      {skills.map((skill) => (
        <div key={skill.skillName} className="skill-row">
          <label>{skill.skillName}</label>
          <div className="skill-options">
            {['NOT_PURCHASED', 'PURCHASED', 'PLUS_10', 'PLUS_20'].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name={skill.skillName}
                  value={level}
                  checked={skill.skillLevel === level}
                  onChange={() => handleSkillChange(skill.skillName, level)}
                />
                {level.replace('_', ' ')}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharacterSkills;
