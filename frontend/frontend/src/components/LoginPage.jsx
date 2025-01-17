import React, { useState } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css"

const LoginPage = () => {
    const [telefon, setTelefon] = useState("");
    const [sifra, setSifra] = useState("");
    const [error, setError] = useState(null);

    const { login } = useUser();
    const navigate = useNavigate();  // useNavigate treba biti definiran u komponenti koja koristi Router

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ telefon, sifra }),
            });

            if (response.ok) {
                const userData = await response.json();
                login(userData); // Pohrani podatke u kontekst
                navigate('/nalozi');  // Nakon uspješne prijave navigiraj na stranicu s nalozima
            } else {
                setError('Neispravni podaci za prijavu.');
            }
        } catch (error) {
            setError('Došlo je do pogreške.');
        }
    };

    return (
        <div>
            <h2>Prijava</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Telefon"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Šifra"
                    value={sifra}
                    onChange={(e) => setSifra(e.target.value)}
                />
                <button type="submit">Prijavi se</button>
            </form>
        </div>
    );
};

export default LoginPage;
