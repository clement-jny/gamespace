import React, { useState } from 'react';

export default function profileInfo() {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: 'user@example.com',
        username: 'username123',
        password: '********',
        firstname: 'John',
        lastname: 'Doe',
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);

    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-2">
            <h2 className="text-lg font-semibold mb-4">Informations de base</h2>
            {isEditing ? (
                <div>

                    <input
                        type="text"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="w-full p-2 mb-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        value={userInfo.username}
                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                        className="w-full p-2 mb-2 border rounded-lg"
                    />
                    <input
                        type="password"
                        value={userInfo.password}
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        className="w-full p-2 mb-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        value={userInfo.firstname}
                        onChange={(e) => setUserInfo({ ...userInfo, firstname: e.target.value })}
                        className="w-full p-2 mb-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        value={userInfo.lastname}
                        onChange={(e) => setUserInfo({ ...userInfo, lastname: e.target.value })}
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
                    <p><strong>Email :</strong> {userInfo.email}</p>
                    <p><strong>Nom d'utilisateur :</strong> {userInfo.username}</p>
                    <p><strong>Mot de passe :</strong> {userInfo.password}</p>
                    <p><strong>Prénom :</strong> {userInfo.firstname}</p>
                    <p><strong>Nom :</strong> {userInfo.lastname}</p>
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

