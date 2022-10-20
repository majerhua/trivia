import { useNavigate } from "react-router-dom";
import { phaseStore } from '../store';
import '../css/pages/general-ranking.css';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useEffect, useState, useRef } from 'react';
import logoTrivia from '../assets/imagenes/logo-trivia.svg';
import axios from 'axios';

const GeneralRanking = () => {

  const [generalRanking, setGeneralRanking] = useState([]);
  const tableRef = useRef(null);


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
        <p className="general-ranking-title">Clasificación General</p>
        <div className="container-btn-export-excel">
            <DownloadTableExcel
                        filename="jugadores de la trivia"
                        sheet="jugadores"
                        currentTableRef={tableRef.current}
                    >
                      <button>Exportar excel</button>
            </DownloadTableExcel>
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
                  <td><div className="container-id">{player.id}</div></td>
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