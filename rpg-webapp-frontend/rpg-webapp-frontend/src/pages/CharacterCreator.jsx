import React, { useState } from 'react';
import CharacterAttributes from '../components/CharacterAttributes';
import CharacterSkills from '../components/CharacterSkills';
import CharacterWeapons from '../components/CharacterWeapons';
import '../styles/CharacterCreator.sass';
import CharacterArmor from '../components/CharacterArmor';
import axios from 'axios';
import CharacterItems from '../components/CharacterItems';


const CharacterCreator = () => {
  const [character, setCharacter] = useState({
    name: '',
    race: '',
    currentProfession: '',
    lastProfession: '',
    age: '',
    gender: '',
    eyeColor: '',
    weight: '',
    hairColor: '',
    height: '',
    starSign: '',
    siblings: '',
    birthPlace: '',
    specialSigns: '',
    campaignName: '',
    campaignYear: '',
    currentExp: '',
    totalExp: '',
    attributes: [],  
    skills: [],      
    backstory: '',
    gold: '',
    silver: '',
    bronze: '',
    notes: ''
  });

  const [weapons, setWeapons] = useState([]); 
  const [armor, setArmor] = useState([]); 
  const [equipment, setEquipment] = useState([]);
  const [talents, setTalents] = useState([]);
  const [message, setMessage] = useState(''); // Status zapisu postaci

  const prepareAttributesForBackend = (attributes) => {
    return {
      attributes: attributes.reduce((acc, attr) => {
        acc[attr.name] = {
          baseValue: attr.baseValue || 0,
          advancementPoints: attr.advancementPoints || 0,
          currentValue: attr.currentValue || 0,
        };
        return acc;
      }, {})
    };
  };
  
  
  
  const prepareSkillsForBackend = (skills) => {
    return {
      skills: skills.reduce((acc, skill) => {
        acc[skill.skillName] = {
          level: skill.skillLevel,
          type: skill.skillType,
        };
        return acc;
      }, {})
    };
  };
  
  
  
    // Funkcja do obsługi zmian w polach formularza
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const characterData = {
        ...character,
        attributes: prepareAttributesForBackend(character.attributes),
        skills: prepareSkillsForBackend(character.skills),
        weapons, 
        armor: armor.map(a => ({
          armorType: a.armorType,
          location: a.location,
          armorPoints: a.armorPoints
        })),
        equipment,
        talents
      };
    
    
      try {
        const response = await axios.post('http://localhost:8080/api/character', characterData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 201) {
          setMessage('Postać została pomyślnie zapisana.');
        }
      } catch (error) {
        setMessage('Wystąpił błąd podczas zapisywania postaci. Spróbuj ponownie.');
        console.error('Błąd zapisu postaci:', error);
      }
    };
    
    
 
  return (
    <div className="character-creator">
      <h2>Stwórz nową postać</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nazwa postaci:</label>
          <input type="text" name="name" value={character.name} onChange={handleChange} />
        </div>

        <div>
          <label>Rasa:</label>
          <input type="text" name="race" value={character.race} onChange={handleChange} />
        </div>

        <div>
          <label>Profesja:</label>
          <input type="text" name="currentProfession" value={character.currentProfession} onChange={handleChange} />
        </div>

        <div>
          <label> Poprzednia profesja:</label>
          <input type="text" name="lastProfession" value={character.lastProfession} onChange={handleChange} />
        </div>

        <div>
          <label>Kampania:</label>
          <input type="text" name="campaignName" value={character.campaignName} onChange={handleChange} />
        </div>

        <div>
          <label>Rok Kampanii:</label>
          <input type="text" name="campaignYear" value={character.campaignYear} onChange={handleChange} />
        </div>

        <h3>Opsi Bohatera</h3>

        <div>
          <label>Wiek:</label>
          <input type="number" name="age" value={character.age} onChange={handleChange} />
        </div>

        <div>
          <label>Płeć:</label>
          <input type="text" name="gender" value={character.gender} onChange={handleChange} />
        </div>

        <div>
          <label>Kolor oczu:</label>
          <input type="text" name="eyeColor" value={character.eyeColor} onChange={handleChange} />
        </div>

        <div>
          <label>Waga:</label>
          <input type="number" name="weight" value={character.weight} onChange={handleChange} />
        </div>

        <div>
          <label>Kolor włosów:</label>
          <input type="text" name="hairColor" value={character.hairColor} onChange={handleChange} />
        </div>

        <div>
          <label>Wzrost:</label>
          <input type="number" name="height" value={character.height} onChange={handleChange} />
        </div>

        <div>
          <label>Znak gwiezdny:</label>
          <input type="text" name="starSign" value={character.starSign} onChange={handleChange} />
        </div>

        <div>
          <label>Rodzeństwo:</label>
          <input type="number" name="siblings" value={character.siblings} onChange={handleChange} />
        </div>

        <div>
          <label>Miejsce urodzenia:</label>
          <input type="text" name="birthPlace" value={character.birthPlace} onChange={handleChange} />
        </div>

        <div>
          <label>Znaki szczegolne:</label>
          <input type="text" name="specialSigns" value={character.specialSigns} onChange={handleChange} />
        </div>

        <h3>Exp</h3>

        <div>
          <label>Obecny Exp:</label>
          <input type="number" name="currentExp" value={character.currentExp} onChange={handleChange} />
        </div>

        <div>
          <label>Total Exp:</label>
          <input type="number" name="totalExp" value={character.totalExp} onChange={handleChange} />
        </div>

        <h3>Cechy</h3>

        <CharacterAttributes character={character} setCharacter={setCharacter} />

        <h3>Umiejętności</h3>

        <CharacterSkills character={character} setCharacter={setCharacter} />

        <h3>Bronie</h3>

        <CharacterWeapons weapons={weapons} setWeapons={setWeapons} />

        <h3>Armor</h3>
        
        <CharacterArmor armor={armor} setArmor={setArmor} /> 

        <h3>Pieniądze</h3>

        <div>
          <label>Złote korony:</label>
          <input type="number" name="gold" value={character.gold} onChange={handleChange} />
        </div>

        <div>
          <label>Srebrne Szylingi:</label>
          <input type="number" name="silver" value={character.silver} onChange={handleChange} />
        </div>

        <div>
          <label>Miedziaki:</label>
          <input type="number" name="bronze" value={character.bronze} onChange={handleChange} />
        </div>

       
        <h3>Wyposażenie:</h3>
        <CharacterItems items={equipment} setItems={setEquipment} />

        <h3>Talenty:</h3>
        <CharacterItems items={talents} setItems={setTalents} />
         
     

        <div>
          <label>Historia:</label>
          <textarea name="backstory" value={character.backstory} onChange={handleChange}></textarea>
        </div>

        <div>
          <label>Notatki:</label>
          <textarea name="notes" value={character.notes} onChange={handleChange}></textarea>
        </div>

        <button type="submit">Zapisz postać</button>
      </form>
    </div>
  );
};

export default CharacterCreator;
