// src/components/Home.js
import React, { useState } from "react";
import './Home.css'; // Assurez-vous d'importer le fichier CSS
import { FaSearch, FaClinicMedical, FaPrescriptionBottle, FaAmbulance } from "react-icons/fa"; // Import des icônes
import Articles from "../ui/Articles";
import { NavLink } from "react-router-dom";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Recherche:', searchQuery);
  };

  return (
    <div className="container">
      <header style={{display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: '#D5EDF2', borderRadius:' 10px'}}>
        <div className="header-text">
          <h1>Bienvenue !</h1>
          <h2>NAME</h2>
          <p>Comment ça va aujourd'hui ?</p>
        </div>
        <div className="header-image">
          <img src="src/img/hero.png"  sizes='10px' alt="Hero" />
        </div>
      </header>


      <div style={{backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
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

      <div className="services">
          <div className="service">
            <FaClinicMedical className="service-icon" />
            <NavLink to="/allergy">Allergy</NavLink>
          </div>
          <div className="service">
            <FaPrescriptionBottle className="service-icon" />
            <p>Pharmacie</p>
          </div>
          <div className="service">
            <FaAmbulance className="service-icon" />
            <p>Ambulance</p>
          </div>
        </div>
        
        <section className="health-articles">
          <h3>Articles de santé</h3>
          <Articles
            img={"src/img/doctor.jpg"}
            title="Les 25 fruits les plus sains que vous pouvez manger, selon un nutritionniste"
            date="Jun 10, 2023"
            duration="5min de lecture"
          />
          <Articles
            img={"src/img/earth.jpeg"}
            title="L'impact du COVID-19 sur les systèmes de santé"
            date="Jul 10, 2023"
            duration="5min de lecture"
          />
        </section>
      </div>
    </div>
  );
};
