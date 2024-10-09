import React, { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import './Formation.css';

const Formation = ({ title, date, duration, img }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

  return (
    <div className="health-article">
      <img src={img} alt="Article" className="article-image" />
      

      <div className="article-content">
        <p className="article-title"><strong>{title}</strong></p>
        <p className="article-info">{date} | {duration}</p>
      </div>
      
      <div className="favorite-icon" onClick={toggleFavorite}>
        {isFavorited ? <FaStar /> : <FaRegStar />}
      </div>

    </div>
  );
};

export default Formation;
