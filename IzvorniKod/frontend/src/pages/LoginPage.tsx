import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './loginScripts/AuthContext';
import api from './loginScripts/axios';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = {
      username: identifier,
      password: password,
    };

    try {
      const response = await api.post('/login', credentials); // Koristi novu instancu api za POST zahtjev

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);

        if (data.role === 'admin') {
          login(data.role);
          navigate('/');
        } else if (data.role === 'radnik') {
          login(data.role, parseInt(identifier, 10));
          navigate('/RadnikTasks');
        }
      } else {
        alert('Login failed! Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter your username or ID"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  },
};

export default LoginPage;
