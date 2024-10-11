// src/components/AboutUs.js
import React from 'react';
import './AboutUs.css';
import { FaHandshake, FaUsers, FaProjectDiagram } from 'react-icons/fa';

export const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-header">
        <h1>Qui sommes-nous ?</h1>
        <p>Découvrez notre projet, notre équipe et nos valeurs.</p>
      </header>

      <section className="values-section">
        <FaHandshake className="section-icon" />
        <h2>Nos valeurs</h2>
        <p>
          Notre projet repose sur des valeurs fondamentales : l'intégrité, l'innovation, et la bienveillance. 
          Nous nous engageons à fournir des services de qualité qui répondent aux besoins de notre communauté.
          Chaque membre de notre équipe s'efforce d'apporter des solutions innovantes et responsables, 
          avec le souci de l'éthique et de la transparence.
        </p>
      </section>

      <section className="team-section">
        <FaUsers className="section-icon" />
        <h2>Notre équipe</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="src/img/h.png" alt="Membre 1" className="team-photo" />
            <h3>Hadès Cuisinier</h3>
            <p>Développeur Back-end & BDD</p>
          </div>
          <div className="team-member">
            <img src="src/img/t.png" alt="Membre 2" className="team-photo" />
            <h3>Thibault Bernuz</h3>
            <p>Développeur Front-end</p>
          </div>
          <div className="team-member">
            <img src="src/img/a.png" alt="Membre 3" className="team-photo" />
            <h3>Allan BIVEGHE </h3>
            <p>Analyste GRC</p>
          </div>
          <div className="team-member">
            <img src="src/img/e.png" alt="Membre 3" className="team-photo" />
            <h3>Emmanuella TONYE</h3>
            <p>Analyste GRC</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <FaProjectDiagram className="section-icon" />
        <h2>Notre projet</h2>
        <p>
          Notre projet est né d'une passion commune pour l'innovation dans le secteur de la santé. 
          Nous développons une plateforme pour faciliter l'accès aux formations sur les allergies et les soins d’urgence, 
          avec un accès rapide aux informations fiables et à jour. 
          Nous espérons ainsi rendre l’information médicale accessible à tous, partout et en toute sécurité.
        </p>
      </section>
    </div>
  );
};
