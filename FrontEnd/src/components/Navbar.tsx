// src/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Vérifie la présence du cookie lors du montage du composant
  useEffect(() => {
    const token = Cookies.get("authToken");
    setIsAuthenticated(!!token); // Authentifié si le token existe
  }, []);

  const handleLinkClick = (event, path) => {
    if (!isAuthenticated) {
      event.preventDefault();
      alert("Veuillez vous connecter pour accéder à cette page.");
      navigate("/login");
    } else {
      navigate(path); // Autoriser la navigation si authentifié
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <nav>
        <Link to="/" className="title">
          Website
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/allergy" onClick={(e) => handleLinkClick(e, "/allergy")}>
              Allergy
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={(e) => handleLinkClick(e, "/services")}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutus" onClick={(e) => handleLinkClick(e, "/aboutus")}>
              AboutUs
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
