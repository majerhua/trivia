import { useNavigate } from "react-router-dom";
import { phaseStore } from '../store';
import '../css/pages/general-ranking.css';
import Button from '../components/button';
import React, { useEffect, useState } from 'react';
import logoTrivia from '../assets/imagenes/logo-trivia.svg';
import axios from 'axios';

const GeneralRanking = () => {
  /*const { setPhase } = phaseStore();
  const navigate = useNavigate();

  const handleClick = ()=> {
    navigate("/registro");
    setPhase(1);
  }*/

  const [generalRanking, setGeneralRanking] = useState([]);

  const listGeneralRanking = async() => {
    const response = await axios.post('https://jsdz6bisv3.execute-api.us-east-1.amazonaws.com/dev/v1/api/general-ranking');
    setGeneralRanking(response.data.data);
  }

  useEffect( () => {
    listGeneralRanking();
  }, [setGeneralRanking]);

  
  return (
      <div className="container-general-ranking">
        <div>
          <img src={logoTrivia} alt="logo_trivia" />
        </div>
        <p>Clasificación General</p>
        <div>
          <table>
            <thead>
              <tr>
                <th>*</th>
                <th>Participante</th>
                <th>Respuestas correctas</th>
                <th>Tiempo</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {generalRanking.map((player, index) => (
                <tr key={index}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.numberCorrectAnswers}</td>
                  <td>{player.timeTakesRespond}</td>
                  <td>{player.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default GeneralRanking;