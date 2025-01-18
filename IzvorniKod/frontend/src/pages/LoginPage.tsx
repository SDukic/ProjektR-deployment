import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [number, setNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate(); // Za preusmjeravanje nakon logina

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Sprječava osvježavanje stranice

        const credentials = {
            username: number,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json(); // Primamo token i ulogu
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role); // "admin" ili "radnik"

                // Preusmjeravanje ovisno o ulozi
                if (data.role === 'admin') {
                    navigate('/NalogTable');
                } else if (data.role === 'radnik') {
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
                    placeholder="Enter your number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
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
