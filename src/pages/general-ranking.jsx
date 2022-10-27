import { useNavigate } from "react-router-dom";
import { phaseStore } from '../store';
import '../css/pages/general-ranking.css';
import Button from '../components/button';
import React, { useEffect, useState } from 'react';
import logoTrivia from '../assets/imagenes/logo-trivia.svg';
import axios from 'axios';
import { BASE_URL } from '../config/api';

const GeneralRanking = () => {

  const navigate = useNavigate();
  const { setPhase } = phaseStore();

  const [generalRanking, setGeneralRanking] = useState([]);

  const listGeneralRanking = async() => {
    const response = await axios.post(`${BASE_URL}/general-ranking`);
    setGeneralRanking(response.data.data);
  }

  useEffect( () => {
    listGeneralRanking();
  }, [setGeneralRanking]);

  const handleClick = ()=> {
    navigate("/registro");
    setPhase(1);
  }

  return (
      <div className="container-general-ranking">
        <div>
          <img src={logoTrivia} alt="logo_trivia" />
        </div>
        <p className="general-ranking-title">Clasificación General</p>
        <div className="container-table-ranking">
          <table>
            <thead>
              <tr>
                <th ><div className="triangle"></div></th>
                <th>PARTICIPANTE</th>
                <th>RESPUESTAS CORRECTAS</th>
                <th>TIEMPO</th>
                <th>PROMEDIO</th>
              </tr>
            </thead>
            <tbody>
              {generalRanking.map((player, index) => (
                <tr key={index + 1}>
                  <td><div className="container-id">{index + 1}</div></td>
                  <td>{player.name}</td>
                  <td>{player.numberCorrectAnswers}</td>
                  <td>{player.timeTakesRespond}</td>
                  <td>{player.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="container-btn-ranking">
          <button className="button btn-general-ranking" onClick={handleClick} >JUGAR DE NUEVO</button>
        </div>
        <div>

        </div>
      </div>
  );
}

export default GeneralRanking;