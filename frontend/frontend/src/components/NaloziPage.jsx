import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';

const NaloziPage = () => {
    const { user, logout } = useUser();
    const [nalozi, setNalozi] = useState([]);

    useEffect(() => {
        const fetchNalozi = async () => {
            if (user) {
                const response = await fetch(`http://localhost:8080/api/nalozi/${user.id}`);
                const data = await response.json();
                setNalozi(data);
            }
        };

        fetchNalozi();
    }, [user]);

    if (!user) {
        return <p>Molimo prijavite se.</p>;
    }

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f4f4f4' }}>
                <h3>Dobrodošli, {user.ime} {user.prezime}</h3>
                <button onClick={logout}>Odjava</button>
            </header>
            <h2>Vaši nalozi</h2>
            <ul>
                {nalozi.map((nalog) => (
                    <li key={nalog.id}>
                        <p>Datum: {nalog.datum}</p>
                        <p>Status: {nalog.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NaloziPage;
