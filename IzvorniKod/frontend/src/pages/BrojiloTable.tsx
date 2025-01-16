    import React, { useState, useEffect } from "react";
    import "./../styles/BrojiloTable.css";

    type BrojiloDTO = {
    id: number;
    serijskiBrojBrojilo: string;
    tipBrojila: string;
    adresa: string;
    kupacId: number;
    };

    const BrojiloTable: React.FC = () => {
    const [brojila, setBrojila] = useState<BrojiloDTO[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newBrojilo, setNewBrojilo] = useState<Omit<BrojiloDTO, "id">>({
        serijskiBrojBrojilo: "",
        tipBrojila: "",
        adresa: "",
        kupacId: 0,
    });

    // Dohvaćanje svih brojila
    useEffect(() => {
        fetch("http://localhost:8080/api/brojila/all")
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched brojila:", data); // Dodano logiranje
            setBrojila(data);
        })
        .catch((error) => console.error("Error fetching brojila:", error));
    }, []);

    // Dodavanje novog brojila
    const handleAddBrojilo = (event: React.FormEvent) => {
        event.preventDefault();

        fetch("http://localhost:8080/api/brojila/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBrojilo),
        })
        .then((response) => response.json())
        .then((createdBrojilo) => {
            console.log("Created brojilo:", createdBrojilo); // Dodano logiranje
            setBrojila((prevBrojila) => [...prevBrojila, createdBrojilo]);
            setNewBrojilo({ serijskiBrojBrojilo: "", tipBrojila: "", adresa: "", kupacId: 0 });
            setShowForm(false);
        })
        .catch((error) => console.error("Error adding brojilo:", error));
    };

    // Brisanje brojila
    const handleDeleteBrojilo = (id: number) => {
        fetch(`http://localhost:8080/api/brojila/delete/${id}`, {
        method: "DELETE",
        })
        .then(() => {
            setBrojila((prevBrojila) =>
            prevBrojila.filter((brojilo) => brojilo.id !== id)
            );
        })
        .catch((error) => console.error("Error deleting brojilo:", error));
    };

    return (
        <div className="brojilo-container">
        <h1 className="title">Popis Brojila</h1>
        <button
            className="add-button"
            onClick={() => setShowForm((prev) => !prev)}
        >
            {showForm ? "Odustani" : "Dodaj Brojilo"}
        </button>

        {showForm && (
            <form className="add-brojilo-form" onSubmit={handleAddBrojilo}>
            <div className="form-group">
                <label>Serijski Broj:</label>
                <input
                type="text"
                value={newBrojilo.serijskiBrojBrojilo}
                onChange={(e) =>
                    setNewBrojilo((prev) => ({ ...prev, serijskiBrojBrojilo: e.target.value }))
                }
                required
                />
            </div>
            <div className="form-group">
                <label>Tip Brojila:</label>
                <input
                type="text"
                value={newBrojilo.tipBrojila}
                onChange={(e) =>
                    setNewBrojilo((prev) => ({ ...prev, tipBrojila: e.target.value }))
                }
                required
                />
            </div>
            <div className="form-group">
                <label>Adresa:</label>
                <input
                type="text"
                value={newBrojilo.adresa}
                onChange={(e) =>
                    setNewBrojilo((prev) => ({ ...prev, adresa: e.target.value }))
                }
                required
                />
            </div>
            <div className="form-group">
                <label>ID Kupca:</label>
                <input
                type="number"
                value={newBrojilo.kupacId}
                onChange={(e) =>
                    setNewBrojilo((prev) => ({ ...prev, kupacId: parseInt(e.target.value) }))
                }
                required
                />
            </div>
            <button type="submit" className="submit-button">
                Dodaj
            </button>
            </form>
        )}

        <table className="brojilo-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Serijski Broj</th>
                <th>Tip Brojila</th>
                <th>Adresa</th>
                <th>ID Kupca</th>
                <th>Akcije</th>
            </tr>
            </thead>
            <tbody>
            {brojila.map((brojilo) => (
                <tr key={brojilo.id}>
                <td>{brojilo.id}</td>
                <td>{brojilo.serijskiBrojBrojilo}</td>
                <td>{brojilo.tipBrojila}</td>
                <td>{brojilo.adresa}</td>
                <td>{brojilo.kupacId}</td>
                <td>
                    <button
                    className="delete-button"
                    onClick={() => handleDeleteBrojilo(brojilo.id)}
                    >
                    Obriši
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    };

    export default BrojiloTable;