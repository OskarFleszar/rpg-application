import { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterLogin.sass';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        nickname,
        email,
        password
      });
      alert('Rejestracja zakończona sukcesem. Możesz się zalogować.');
    } catch (error) {
      setError('Wystąpił błąd podczas rejestracji');
    }
  };

  return (
    <div className="main">
    <div className="form-container">
    <div className="form-box">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nickname</label>
          <input 
            type="text" 
            placeholder="Nickname"
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Email address"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</div>
  );
}

export default Register;