import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { TriviaSchema } from '../schema/schema';
import { useNavigate } from "react-router-dom";
import { phaseStore, playerIdStore, loaderStore } from '../store';
import axios from 'axios';
import '../css/pages/trivia.css';
import logoTrivia from '../assets/imagenes/logo-trivia.svg';
import Progressbar from '../components/progress-bar';

const Question = ({seconds, minutes}) => {

  const navigate = useNavigate();
  const { setPhase } = phaseStore();
  const { playerId } = playerIdStore();
  const { loader, setLoader } = loaderStore();

  const [question, setQuestion] = useState({});
  const [questionNumber, setQuestionNumber] = useState(1);
  const [alternativeNumber, setAlternativeNumber] = useState(null);

  const listQuestion = async() => {
    const data = {
      playerId,
      questionNumber
    }

    const response = await axios.post('https://jsdz6bisv3.execute-api.us-east-1.amazonaws.com/dev/v1/api/list-question',data);

    if(response.data.code === 1) {
      setQuestion(response.data.data);
    }else if(response.data.code === 2){
      navigate("/juego-terminado", {state: {
        playerId,
        timeTakesRespond: `${minutes}:${seconds}`,
        phase: 3
      }});
    }

    setLoader(false);
  }

  useEffect( () => {
    listQuestion();
  }, [questionNumber]);

  const { register, handleSubmit, reset ,formState:{ errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(TriviaSchema),
    defaultValues: {
      alternativeNumber: null
    }
  });
  
  const onChangeValue = (event) => {
    setAlternativeNumber(parseInt(event.target.value));
  }

  const onSubmit = async (data) => {
    data = {...data, ...{
      playerId,
      questionId: question.id,
      questionNumber
    }};
    setLoader(true);
    await axios.post('https://jsdz6bisv3.execute-api.us-east-1.amazonaws.com/dev/v1/api/register-question',data);

    setQuestionNumber(questionNumber + 1);
    setAlternativeNumber(null);
    reset({
      alternativeNumber: null
    })
  } 

  return (
      <div className="container-trivia">
          <div className="content-section">
            <img src={logoTrivia} alt="logo_trivia" />
          </div>
          <div className="content-section">
            <p>Ponga a prueba sus conocimientos del mundo del futbol</p>
            <p>Para completar la trivia usted debe responder 25 preguntas en <span className="timer-one">15:00</span> minutos</p>
            <p>Tiempo transcurrido</p>
            <p><span className="timer-two">{`${minutes}:${seconds <= 9 ? '0'+seconds:seconds}`}</span></p>
          </div>
          <div className="content-section">
            {question.text ? 
              <div className="question">
                <div className="number">{questionNumber}</div>
                <p>{question.text}</p>
              </div>
              : ""}
            <div className='form-section'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div onChange={onChangeValue} className="alternatives-content">
                {question.Alternatives ? question.Alternatives.map((alternative, index) => (
                  <div key={index + 1} className="alternative">
                    <label className="content-input">
                    <input checked={alternativeNumber===alternative.number} value={alternative.number} type="radio" name="alternativeNumber"  {...register('alternativeNumber')}/>{alternative.text}
	                      <i></i>
                      </label> 
                  </div>
                )) : null}
                </div>
                <button className="button btn-trivia" type="submit">Siguiente</button>
              </form>
              <div className="container-marcador">
                <span>{`${questionNumber} / 25`}</span>
              </div>
              <div className="container-progress-bar">
                <Progressbar bgcolor="#760B24" progress={4 * questionNumber}  height={30} />
              </div>
            </div>
          </div>
      </div>
  );
}

export default Question;