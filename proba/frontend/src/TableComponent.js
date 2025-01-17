import React, { useState, useEffect } from 'react';
import axios from 'axios';

const server_url = "http://localhost:8080/api/svaOcitanja";

function TableComponent() {
    const [ocitanja, setOcitanja] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);

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

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedOcitanja = React.useMemo(() => {
        let sortableItems = [...ocitanja];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [ocitanja, sortConfig]);

    const getSortIcon = (key) => {
        if (sortConfig && sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↑' : '↓';
        }
        return '↔'; // Nema sortiranja
    };

    return (
        <div className="table-container">
            <h2>Popis očitanja brojila</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('kupac')}>
                            Kupac {getSortIcon('kupac')}
                        </th>
                        <th onClick={() => requestSort('gornjaTarifa')}>
                            Gornja tarifa {getSortIcon('gornjaTarifa')}
                        </th>
                        <th onClick={() => requestSort('donjaTarifa')}>
                            Donja tarifa {getSortIcon('donjaTarifa')}
                        </th>
                        <th onClick={() => requestSort('radnici')}>
                            Radnici {getSortIcon('radnici')}
                        </th>
                        <th onClick={() => requestSort('nalog')}>
                            Nalog {getSortIcon('nalog')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedOcitanja.map((ocitanje, index) => (
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

export default TableComponent;
