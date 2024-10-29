import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.sass';

function Profile() {

  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState('');
  const [tempEmail, setTempEmail] = useState('');

  // Pobieranie danych użytkownika przy ładowaniu komponentu
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/one', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setNickname(response.data.nickname);
        setEmail(response.data.email);
        setId(response.data.userId);
      } catch (error) {
        console.error("Błąd przy pobieraniu danych użytkownika:", error);
      }
    };

    fetchUserData();
  }, []);

  // Funkcja do rozpoczęcia edycji
  const handleEdit = () => {
    setIsEditing(true);
    setTempNickname(nickname);
    setTempEmail(email);
  };

  // Funkcja do anulowania edycji
  const handleCancel = () => {
    setIsEditing(false);
    setTempNickname(nickname);
    setTempEmail(email);
  };

  // Funkcja do zapisywania zmian
  const handleSave = async () => {
    try {
        await axios.put(`http://localhost:8080/api/user`, {
            nickname: tempNickname,
            email: tempEmail,
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
      setNickname(tempNickname);
      setEmail(tempEmail);
      setIsEditing(false);
      alert('Dane zostały zaktualizowane');
    } catch (error) {
      console.error("Błąd podczas zapisywania zmian: " , error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profil użytkownika</h2>
      {isEditing ? (
        <>
          <div>
            <label>Nickname:</label>
            <input 
              type="text" 
              value={tempNickname} 
              onChange={(e) => setTempNickname(e.target.value)} 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={tempEmail} 
              onChange={(e) => setTempEmail(e.target.value)} 
            />
          </div>
          <button onClick={handleSave}>Zapisz</button>
          <button onClick={handleCancel}>Anuluj</button>
        </>
      ) : (
        <>
          <p><strong>Nickname:</strong> {nickname}</p>
          <p><strong>Email:</strong> {email}</p>
          <button onClick={handleEdit}>Edytuj</button>
        </>
      )}
    </div>
  );
}

export default Profile;
