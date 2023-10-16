import React from 'react';
import './styles.css';

const SignupForm = () => {
    return (
        <div className="form-container">
            <h2 className="form-title">Inscription</h2>
            <form>
                <div>
                    <label className="form-label">Nom d'utilisateur :</label>
                    <input className="form-input" type="text" />
                </div>
                <div>
                    <label className="form-label">Email :</label>
                    <input className="form-input" type="email" />
                </div>
                <div>
                    <label className="form-label">Mot de passe :</label>
                    <input className="form-input" type="password" />
                </div>
                <button className="form-button">S'inscrire</button>
            </form>
        </div>
    );
};

export default SignupForm;
