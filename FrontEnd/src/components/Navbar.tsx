import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
