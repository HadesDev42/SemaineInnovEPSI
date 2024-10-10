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

interface QuestionData {
  id: string;
  question_text: string;
  training_id: string;
  created_at: string;
  updated_at: string;
}

interface ChoicesData {
  id: string;
  choice_text: string;
  is_correct: boolean;
  question_id: string;
  created_at: string;
  updated_at: string;
}

export const Services = () => {
  const location = useLocation();
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [choicesData, setChoicesData] = useState<Array<ChoicesData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

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
        console.log("Training Data:", data); // Pour voir ce que tu récupères
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

    const fetchQuestionData = async () => {
      const trainingId = location.state?.trainingId;
      if (!trainingId) {
        setError("Aucun ID de formation trouvé.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:8000/api/questions/getQuestionsByTrainingId/${trainingId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la requête');
        }
        const result = await response.json();
        console.log("Question Data:", result); // Vérifie ce qui est récupéré
        setQuestionData(result.data[0]); // Assure-toi que l'API renvoie un tableau
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingData();
    fetchQuestionData();
  }, [location.state]);

  const handleFavoriteClick = async () => {
    if (isFavorited) {
      await removeFavorite();
    } else {
      await addFavorite();
    }
  };

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId); // Mettre à jour le choix sélectionné
  };

  const handleValidate = () => {
    const selectedChoiceData = choicesData?.find(choice => choice.id === selectedChoice);
    if (selectedChoiceData?.is_correct) {
      alert("Bonne réponse !");
    } else {
      alert("Mauvaise réponse !");
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
      const response = await fetch(`http://localhost:8000/api/favorites/remove/${trainingData.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
  useEffect(() => {
    const fetchChoicesData = async () => {
      if (!questionData) return; // Assure-toi que questionData est défini
      const questionId = questionData.id;
      if (!questionId) {
        setError("Aucun ID de question trouvé.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:8000/api/choices/getChoicesByQuestionId/${questionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la requête');
        }

        const result = await response.json();
        console.log("Choices Data:", result); // Pour voir ce que tu récupères
        setChoicesData(result.data);
      } catch (error) {
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    if (questionData) fetchChoicesData(); // Appelle seulement si questionData est défini
  }, [questionData]);

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
      <div className="question">
        <h2>Question(s)</h2>
        <p>{questionData?.question_text}</p>
        <ul className='questions'>
          {choicesData?.map((choice) => (
            <li 
              key={choice.id} 
              className={selectedChoice === choice.id ? 'selected' : ''} // Appliquer une classe si sélectionné
              onClick={() => handleChoiceSelect(choice.id)} // Rendre l'élément cliquable
            >
              {choice.choice_text}
            </li>
          ))}
        </ul>
        <button onClick={handleValidate}>Valider</button>
      </div>
    </div>
  );
};