import { useNavigate } from "react-router-dom";
import { phaseStore } from '../store';
import '../css/pages/general-ranking.css';
import { downloadExcel  } from 'react-export-table-to-excel';
import React, { useEffect, useState, useRef } from 'react';
import logoTrivia from '../assets/imagenes/logo-trivia.svg';
import axios from 'axios';
import { BASE_URL } from '../config/api';

const GeneralRanking = () => {

  const [generalRanking, setGeneralRanking] = useState([]);
  const tableRef = useRef(null);


  const listGeneralRanking = async() => {
    const response = await axios.post(`${BASE_URL}/general-ranking`);
    console.log(response.data.data);
    setGeneralRanking(response.data.data);
  }

  useEffect( () => {
    listGeneralRanking();
  }, [setGeneralRanking]);

  const header = [
          'CODIGO PARTICIPANTE',
          'TIPO DE DOCUMENTO',
          'NUMERO DE DOCUMENTO',
          'PARTICIPANTE',
          'TELEFONO',
          'EMAIL',
          'SUSCRIPTOR',
          'FECHA DE PARTICIPACION',
          'TIEMPO DE JUEGO',
          'RESPUESTAS CORRECTAS',
          'PROMEDIO',
        ];


  const handleDownloadExcel = ()=>{
    console.log(generalRanking);
    downloadExcel({
      fileName: "jugadores",
      sheet: "jugadores",
      tablePayload: {
        header,
        body: generalRanking
      },
    });
  }

  return (
      <div className="container-general-ranking">
        <div>
          <img src={logoTrivia} alt="logo_trivia" />
        </div>
        <p className="general-ranking-title">Clasificación General</p>
        <div className="container-btn-export-excel">
          <button onClick={handleDownloadExcel}>Exportar excel</button>
        </div>
        <div className="container-table-ranking container-table-ranking-export">
          <table ref={tableRef}>
            <thead>
              <tr>
                <th ><div className="triangle"></div></th>
                <th>PARTICIPANTE</th>
                <th>TIPO DE DOCUMENTO</th>
                <th>NUMERO DE DOCUMENTO</th>
                <th>TELEFONO</th>
                <th>FECHA DE PARTICIPACION</th>
                <th>RESPUESTAS CORRECTAS</th>
                <th>TIEMPO</th>
                <th>PROMEDIO</th>
              </tr>
            </thead>
            <tbody>
              {generalRanking.map((player, index) => (
                <tr key={index}>
                  <td><div className="container-id">{index + 1}</div></td>
                  <td>{player.name}</td>
                  <td>{player.documentType}</td>
                  <td>{player.documentNumber}</td>
                  <td>{player.phone}</td>
                  <td>{player.dateTimeStartedPlaying}</td>
                  <td>{player.numberCorrectAnswers}</td>
                  <td>{player.timeTakesRespond}</td>
                  <td>{player.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>

        </div>
      </div>
  );
}

export default GeneralRanking;