import React, { useState, useEffect } from 'react';
import axios from 'axios';


function PrikazPodataka() {
    const [ocitanja, setOcitanja] = useState([]);

    useEffect(() => {
        // Dohvati podatke sa servera
        axios.get('http://localhost:8080/api/svaOcitanja')
            .then(response => {
                setOcitanja(response.data);
            })
            .catch(error => {
                console.error("Došlo je do greške prilikom dohvaćanja podataka!", error);
            });
    }, []);

    return (
        <div className="table-container">
            <h2>Popis očitanja brojila</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Kupac</th>
                        <th>Gornja tarifa</th>
                        <th>Donja tarifa</th>
                        <th>Radnici</th>
                        <th>Nalog</th>
                    </tr>
                </thead>
                <tbody>
                    {ocitanja.map((ocitanje, index) => (
                        <tr key={index}>
                            <td>{ocitanje.kupac}</td>
                            <td>{ocitanje.gornjaTarifa}</td>
                            <td>{ocitanje.donjaTarifa}</td>
                            <td>{ocitanje.radnici}</td>
                            <td>{ocitanje.nalog}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PrikazPodataka;
