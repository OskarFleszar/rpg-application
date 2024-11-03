import { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';
import { Link } from 'react-router-dom';

function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/character', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCharacters(response.data); // Zakładamy, że response.data to lista postaci
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="characters-list">
      <h2>Twoje postacie</h2>
      <div className="characters-container">
        {characters.map((character) => (
          <CharacterCard key={character.characterId} character={character} />
        ))}
      </div>
      <Link to="/character-creator">
      <button>Create a new character</button>
      </Link>
    </div>
  );
}

export default Characters;
