// src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { postData } from '../../utils/api';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await postData('auth/login', loginData);

      if (response && response.data.token) {
        Cookies.set('authToken', response.data.token, { expires: 2 });
        setMessage('Connexion réussie !');
        navigate('/');
      } else {
        setMessage("Aucun token reçu lors de la connexion.");
      }
    } catch (error) {
      setMessage("Erreur lors de la connexion : " + error.message);
    }
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
      {message && <p style={{ textAlign: 'center', marginTop: '20px', color: message.includes("Erreur") ? 'red' : 'green' }}>{message}</p>}
      <div className="signup-link">
        <p>
          Pas inscrit ? <Link to="/signup">Inscrivez-vous ici</Link>
        </p>
      </div>
    </div>
  );
};
