// src/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importation de Link pour la navigation
import './Signup.css'; // Importation des styles CSS

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nouveau state pour la confirmation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
    // Ajoutez ici la logique pour gérer l'inscription
  };

  return (
    <div className="signup-container"> {/* Utilisation de la classe signup-container */}
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Entrez votre adresse e-mail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmez le mot de passe</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirmez votre mot de passe"
          />
        </div>
        <button type="submit" className="btn">S'inscrire</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Vous avez déjà un compte ? <Link to="/login">Connexion ici</Link>
      </p>
    </div>
  );
};
