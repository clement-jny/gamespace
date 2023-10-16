import React from 'react';
import './styles.css';

const LoginForm = () => {
    return (
        <div className="form-container">
            <h2 className="form-title">Connexion</h2>
            <form>
                <div>
                    <label className="form-label">Email :</label>
                    <input className="form-input" type="email" />
                </div>
                <div>
                    <label className="form-label">Mot de passe :</label>
                    <input className="form-input" type="password" />
                </div>
                <button className="form-button">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginForm;
