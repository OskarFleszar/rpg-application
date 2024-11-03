import { Link } from 'react-router-dom';
import '../styles/CharacterCard.sass';

function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.characterId}`} className="character-card">
      <h3>{character.name}</h3>
      <p>Rasa: {character.race}</p>
      <p>Profesja: {character.currentProfession}</p>
    </Link>
  );
}

export default CharacterCard;
