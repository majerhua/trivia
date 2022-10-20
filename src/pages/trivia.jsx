import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { phaseStore, loaderStore, playerIdStore } from '../store';
import '../css/pages/trivia.css';
import { useCountdown } from '../hooks/useCountdown';
import Question from './question';

const Trivia = () => {

  const navigate = useNavigate();
  const { phase, setPhase } = phaseStore();
  const { playerId } = playerIdStore();

  let [minutes, seconds] = useCountdown();

  if(minutes === 0 && seconds === 5) {
    setTimeout(() => navigate("/juego-terminado",
      {
        state: {
          playerId,
          timeTakesRespond: `${minutes}:${seconds}`,
          phase: 3
        }
      }), 2000);
  }

  useEffect(() => {
    if(phase !== 2) {
      navigate("/");
    }
  }, [phase]);

  return ( 
    <Question seconds={seconds} minutes={minutes}/>
  );
}

export default Trivia;