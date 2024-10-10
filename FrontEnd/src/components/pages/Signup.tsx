// src/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import { postData } from '../../utils/api';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    
    const userData = {
      name: name,
      email: email,
      password: password,
      c_password: confirmPassword
    };

    try {
      const response = await postData('auth/register', userData);
      console.log(response);
      setMessage('Inscription réussie !'); // Message de succès
    } catch (error) {
      setMessage("Erreur lors de l'inscription : " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Entrez votre nom"
          />
        </div>
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
      {message && <p style={{ textAlign: 'center', marginTop: '20px', color: message.includes("Erreur") ? 'red' : 'green' }}>{message}</p>}
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Vous avez déjà un compte ? <Link to="/login">Connexion ici</Link>
      </p>
    </div>
  );
};
