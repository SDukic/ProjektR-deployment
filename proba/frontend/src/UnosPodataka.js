import React, { useState } from 'react';
import axios from 'axios';

function UnosPodataka() {
    const [formData, setFormData] = useState({
        kupac: '',
        gornjaTarifa: '',
        donjaTarifa: '',
        radnici: '',
        nalog: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/spremiOcitavanje', formData)
            .then(response => {
                alert('Podaci su uspješno spremljeni!');
            })
            .catch(error => {
                console.error("Došlo je do greške prilikom spremanja podataka!", error);
                alert('Došlo je do greške prilikom spremanja podataka!');
            });
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Očitavanje brojila</h2>

                <label htmlFor="kupac">Kupac električne energije:</label>
                <input
                    type="text"
                    name="kupac"
                    id="kupac"
                    value={formData.kupac}
                    onChange={handleChange}
                    required
                    placeholder="Unesite ime kupca"
                />

                <label htmlFor="gornjaTarifa">Brojilo (gornja tarifa):</label>
                <input
                    type="number"
                    name="gornjaTarifa"
                    id="gornjaTarifa"
                    value={formData.gornjaTarifa}
                    onChange={handleChange}
                    required
                    placeholder="Unesite gornju tarifu"
                />

                <label htmlFor="donjaTarifa">Brojilo (donja tarifa):</label>
                <input
                    type="number"
                    name="donjaTarifa"
                    id="donjaTarifa"
                    value={formData.donjaTarifa}
                    onChange={handleChange}
                    required
                    placeholder="Unesite donju tarifu"
                />

                <label htmlFor="radnici">Radnici za očitavanje:</label>
                <input
                    type="text"
                    name="radnici"
                    id="radnici"
                    value={formData.radnici}
                    onChange={handleChange}
                    required
                    placeholder="Unesite imena radnika"
                />

                <label htmlFor="nalog">Nalog za očitavanje brojila:</label>
                <input
                    type="number"
                    name="nalog"
                    id="nalog"
                    value={formData.nalog}
                    onChange={handleChange}
                    required
                    placeholder="Unesite broj naloga"
                />

                <button type="submit">Pošalji</button>
            </form>
        </div>
    );
}

export default UnosPodataka;
