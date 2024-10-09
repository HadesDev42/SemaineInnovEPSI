// src/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importation du Link pour la navigation
import './Login.css'; // Importation des styles CSS

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Ajoutez ici la logique pour gérer la connexion
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
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
        <button type="submit" className="btn">Se connecter</button>
      </form>
      <div className="signup-link">
        <p>
          Pas inscrit ? <Link to="/signup">Inscrivez-vous ici</Link>
        </p>
      </div>
    </div>
  );
};
