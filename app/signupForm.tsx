import React from 'react';
import './styles.css';

interface SignupFormProps {
    toggleSignup: () => void;
}

const SignupForm = ({ toggleSignup }: SignupFormProps) => {
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

                <button className="form-button">
                    Se connecter
                </button>

                <button className="form-signup" onClick={toggleSignup}>
                    Annuler
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
