// src/components/Home.js
import React, { useState } from "react";
import './Allergy.css';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Allergy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleRedirect = (trainingId) => {
    // Redirige vers /services avec l'ID de formation dans le state
    navigate('/services', { state: { trainingId } });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Recherche:', searchQuery);
  };

  return (
    <div className="container">
      <div>
        <img src="src/img/learning.png" className="service-image" />
      </div>

      <header style={{ display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: '#D5EDF2', borderRadius: '10px' }}>
        <div className="header-text"></div>
      </header>

      <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
        <div className="search-box">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un médecin, des médicaments, des articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <section className="health-articles">
          <h3>Les Différents types d'allergies</h3>

          <div onClick={() => handleRedirect('42949a5e-a4eb-406a-b5da-16f3344aa93c')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
            ICI
          </div>
          <div onClick={() => handleRedirect('2')} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
            LA
          </div>
        </section>
      </div>
    </div>
  );
};
