import React, { useState } from 'react';

export default function AddressInfo() {
    const [isEditing, setIsEditing] = useState(false);
    const [addressInfo, setAddressInfo] = useState({
        street: '123 Main St',
        city: 'Cityville',
        zipCode: '12345',
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Envoyez les informations mises à jour au serveur ou à votre gestionnaire d'état.
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-2">
            <h2 className="text-lg font-semibold mb-4">Informations d'adresse</h2>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={addressInfo.street}
                        onChange={(e) => setAddressInfo({ ...addressInfo, street: e.target.value })}
                        className="w-full p-2 mb-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        value={addressInfo.city}
                        onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
                        className="w-full p-2 mb-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        value={addressInfo.zipCode}
                        onChange={(e) => setAddressInfo({ ...addressInfo, zipCode: e.target.value })}
                        className="w-full p-2 mb-2 border rounded-lg"
                    />
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white p-2 rounded-lg mr-2"
                    >
                        Valider
                    </button>
                </div>
            ) : (
                <div>
                    <p><strong>Rue :</strong> {addressInfo.street}</p>
                    <p><strong>Ville :</strong> {addressInfo.city}</p>
                    <p><strong>Code postal :</strong> {addressInfo.zipCode}</p>
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white p-2 rounded-lg"
                    >
                        Modifier
                    </button>
                </div>
            )
            }
        </div>
    )
}
