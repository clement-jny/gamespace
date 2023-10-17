import React from 'react';
import './styles.css';

interface LoginFormProps {
    toggleSignup: () => void;
}

const LoginForm = ({ toggleSignup }: LoginFormProps) => {
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
                <button className="form-button">
                    Se connecter
                </button>

                <button className="form-signup" onClick={toggleSignup}>
                    S'inscrire
                </button>

            </form>
        </div>
    );
};

export default LoginForm;
