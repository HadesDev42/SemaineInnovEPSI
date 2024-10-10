import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Favorite.css';

export const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = Cookies.get('authToken');

      try {
        const response = await fetch('http://localhost:8000/api/favorites/getUserFavorites', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des favoris");
        }

        const data = await response.json();
        setFavorites(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleFavoriteClick = (trainingId) => {
    navigate('/services', { state: { trainingId } });
  };

  if (loading) return <p>Chargement des favoris...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="favorites-container">
      <h2>Vos Favoris</h2>
      {favorites.length > 0 ? (
        <ul className="favorites-list">
          {favorites.map((favorite) => (
            <li
              key={favorite.id}
              className="favorite-item"
              onClick={() => handleFavoriteClick(favorite.id)}
              style={{ cursor: 'pointer' }}
            >
              <h3>{favorite.title}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun favori pour le moment.</p>
      )}
    </div>
  );
};
