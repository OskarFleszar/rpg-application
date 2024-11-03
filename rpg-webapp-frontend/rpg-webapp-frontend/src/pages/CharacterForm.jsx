import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CharacterForm.sass';

function CharacterForm() {
  const { id } = useParams(); // Pobieranie characterId z URL
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/character/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCharacter(response.data);
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!character) {
    return <p>Ładowanie szczegółów postaci...</p>;
  }

  return (
    <div className="character-details">
      <p><strong>Imię:</strong> {character.name}</p>
      <p><strong>Rasa:</strong> {character.race}</p>
      <p><strong>Profesja:</strong> {character.currentProfession}</p>
      <p><strong>Poprzednia profesja:</strong> {character.lastProfession}</p>
      <p><strong>Kampania:</strong> {character.campaignName} ({character.campaignYear})</p>

      <h3>Opsi Bohatera</h3>

      <p><strong>Wiek:</strong> {character.age}</p>
      <p><strong>Płeć:</strong> {character.gender}</p>
      <p><strong>Kolor Oczu:</strong> {character.eyeColor}</p>
      <p><strong>Waga:</strong> {character.weight}</p>
      <p><strong>Kolor Włosów:</strong> {character.hairColor}</p>
      <p><strong>Wzrost:</strong> {character.height}</p>
      <p><strong>Znak gwiezdny:</strong> {character.starSign}</p>
      <p><strong>Rodzeństwo:</strong> {character.siblings}</p>
      <p><strong>Miejsce urodzenia:</strong> {character.birthPlace}</p>
      <p><strong>Znaki szczegolne:</strong> {character.specialSigns}</p>

      <h3>Exp</h3>
      <p><strong>Obecny exp:</strong> {character.currentExp}</p>
      <p><strong>Total exp:</strong> {character.totalExp}</p>
      <h3>Cechy</h3>
      <ul>
        {Object.entries(character.attributes.attributes).map(([key, attr]) => (
          <li key={key}>{key}: {attr.currentValue} (Bazowa: {attr.baseValue}, Punkty: {attr.advancementPoints})</li>
        ))}
      </ul>
      <h3>Umiejętności</h3>
      <ul>
        {Object.entries(character.skills.skills).map(([key, skill]) => (
          <li key={key}>{key}: {skill.level}</li>
        ))}
      </ul>
      <h3>Broń</h3>
      <ul>
        {character.weapons.map((weapon, index) => (
          <li key={index}>{weapon.name} - {weapon.category}, Siła: {weapon.strength} (Zasięg: {weapon.range})</li>
        ))}
      </ul>
      <h3>Pancerz</h3>
      <ul>
        {character.armor.map((armor, index) => (
          <li key={index}>{armor.location}: {armor.armorPoints} pkt ({armor.armorType})</li>
        ))}
      </ul>
      <h3>Talenty</h3>
      <ul>
        {character.talents.map((talent, index) => (
          <li key={index}>{talent.name}: {talent.description} </li>
        ))}
      </ul>
      <h3>Wyposażenie</h3>
      <ul>
        {character.equipment.map((item, index) => (
          <li key={index}>{item.name}: {item.description} </li>
        ))}
      </ul>
      <h3>Historia</h3>
      <p>{character.backstory}</p>
      <h3>Notatki</h3>
      <p>{character.notes}</p>
    </div>
  );
}

export default CharacterForm;
