import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { phaseStore, loaderStore } from '../store';
import '../css/pages/game-over.css';
import gameOver from '../assets/imagenes/game-over.svg';
import axios from 'axios';
import { BASE_URL } from '../config/api';

const GameOver = () => {
  const { setPhase } = phaseStore();
  const { setLoader } = loaderStore();

  const [ranking, setRanking] = useState({});


  const navigate = useNavigate();
  const location = useLocation();

  const handleClickNewGame = ()=> {
    navigate("/registro");
    setPhase(1);
  }

  const handleClickPosition = ()=> {
    navigate("/ranking-general");
    setPhase(1);
  }

  const registerTimer = async(playerId, timeTakesRespond) => {
    const data = {
      playerId,
      timeTakesRespond: `00:${timeTakesRespond}`
    }
    await axios.post(`${BASE_URL}/record-question-time`,data);
    getTimeAndCorrectQuestions(playerId);
  }

  const getTimeAndCorrectQuestions = async(playerId) => {
    const data = {
      playerId
    }
    const response = await axios.post(`${BASE_URL}/player-ranking`,data);

    if(response.data.code === 1) {
      if(response.data.data.length > 0){
        setRanking(response.data.data[0]);
      }
    }
    setLoader(false);
  }

  useEffect(() => {
    if(location.state && location.state.phase){
      setLoader(true);
      registerTimer(location.state.playerId, location.state.timeTakesRespond);
    }else {
      setPhase(1);
      navigate("/");
    }
  }, []);

  return (
      <div className="container-game-over">
        <p className="title-game-over">¡Ha finalizado el juego!</p>
        <img src={gameOver}   alt="logo_trivia" />
        <p className="text-game-over">Usted acertó {ranking?.numberCorrectAnswers} respuestas en {ranking?.timeTakesRespond} minutos.</p>
        <div className="container-buttons-game-over">
          <button className="button btn-game-over" onClick={handleClickNewGame}>JUGAR DE NUEVO</button>
          <button className="button btn-game-over" onClick={handleClickPosition}>VER POSICIONES</button>
        </div>
      </div>
  );
}

export default GameOver;