import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from 'react';
import { phaseStore } from '../store';
import './game-over.css';
import Button from '../components/button';
import gameOver from '../assets/imagenes/game-over.svg';
import axios from 'axios';

const GameOver = () => {
  const { setPhase } = phaseStore();

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
      timeTakesRespond
    }
    await axios.post('https://jsdz6bisv3.execute-api.us-east-1.amazonaws.com/dev/v1/api/record-question-time',data);
  }

  useEffect(() => {
    console.log(location); 
    registerTimer(location.state.playerId, location.state.timeTakesRespond);
  }, []);

  return (
      <div className="container-game-over">
        <p>¡Ha finalizado el juego!</p>
        <img src={gameOver}   alt="logo_trivia" />
        <p>Usted acertó 25 respuestas en 2 minutos.</p>
        <div>
          <Button text="Jugar de Nuevo" handleClick={handleClickNewGame}/>
          <Button text="Ver posiciones" handleClick={handleClickPosition}/>
        </div>
      </div>
  );
}

export default GameOver;