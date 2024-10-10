import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Services.css';

interface TrainingData {
  id: string;
  title: string;
  description: string;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

export const Services = () => {
  const location = useLocation();
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainingData = async () => {
      const trainingId = location.state?.trainingId;
      if (!trainingId) {
        setError("Aucun ID de formation trouvé.");
        setLoading(false);
        return;
      }

      try {
        const token = Cookies.get('authToken');
        
        const response = await fetch(`http://localhost:8000/api/trainings/getByID/${trainingId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Erreur lors de la requête pour les détails de la formation');

        const data = await response.json();
        setTrainingData(data.training);
        
        const favoritesResponse = await fetch('http://localhost:8000/api/favorites/getUserFavorites', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!favoritesResponse.ok) throw new Error('Erreur lors de la requête pour les favoris');

        const favoritesData = await favoritesResponse.json();
        const isFavorite = favoritesData.data.some((fav) => fav.id === trainingId);
        setIsFavorited(isFavorite);

      } catch (error) {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingData();
  }, [location.state]);

  const handleFavoriteClick = async () => {
    if (isFavorited) {
      await removeFavorite();
    } else {
      await addFavorite();
    }
  };

  const addFavorite = async () => {
    if (!trainingData) return;

    const token = Cookies.get('authToken');
    try {
      const response = await fetch('http://localhost:8000/api/favorites/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ training_id: trainingData.id }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setIsFavorited(true);
        alert("Ajouté aux favoris !");
      } else {
        setError("Impossible de liker cette formation.");
      }
    } catch (error) {
      setError("Erreur lors de l'ajout aux favoris.");
      console.error("Erreur lors de l'ajout aux favoris:", error);
    }
  };

  const removeFavorite = async () => {
    if (!trainingData) return;

    const token = Cookies.get('authToken');
    try {
      const response = await fetch(`http://localhost:8000/api/favorites/remove/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ training_id: trainingData.id }),
      });

      if (response.ok) {
        setIsFavorited(false);
        alert("Retiré des favoris !");
      } else {
        setError("Impossible de retirer cette formation des favoris.");
      }
    } catch (error) {
      setError("Erreur lors du retrait des favoris.");
      console.error("Erreur lors du retrait des favoris:", error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!trainingData) return <p>Aucune donnée disponible.</p>;

  return (
    <div className="container">
      <header className="header">
        <div className="header-text">
          <h1>Formation : {trainingData.title}</h1>
          <span onClick={handleFavoriteClick} style={{ cursor: 'pointer', fontSize: '24px' }}>
            {isFavorited ? '★' : '☆'}
          </span>
        </div>
      </header>

      <div className="training-content">
        <p>{trainingData.description}</p>
        {trainingData.video_url ? (
          <video controls src={trainingData.video_url} className="training-video" />
        ) : (
          <p>Aucune vidéo disponible</p>
        )}
      </div>
    </div>
  );
};
