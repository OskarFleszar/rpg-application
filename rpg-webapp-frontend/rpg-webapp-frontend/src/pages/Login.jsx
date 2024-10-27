import { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterLogin.sass';
import Navbar from '../components/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token); 
      console.log('Zalogowano pomyślnie:', token);

      
      const loginEvent = new Event('login');
      window.dispatchEvent(loginEvent);
      
    } catch (error) {
      setError('Nieprawidłowy email lub hasło');
    }
  };

  return (
    <div className="main">
      <div className="form-container">
        <div className="form-box">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin}>
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
            {error && <p>{error}</p>}
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
