import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { phaseStore, loaderStore, playerIdStore } from '../store';
import '../css/pages/trivia.css';
import { useCountdown } from '../hooks/useCountdown';
import Question from './question';

const Trivia = ({counter}) => {

  const navigate = useNavigate();
  const { phase } = phaseStore();
  const { playerId } = playerIdStore();
  const { setLoader } = loaderStore();

  let [minutes, seconds] = useCountdown(counter);

  console.log("Seconds =>",seconds);

  if(minutes === 2 && seconds === 0) {
   // setLoader(true);
    setTimeout(() => navigate("/juego-terminado",{state: {
      playerId,
      timeTakesRespond: `${minutes}:${seconds}`
    }}), 2000);
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