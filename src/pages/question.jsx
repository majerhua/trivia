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
  const { phase } = phaseStore();
  const { playerId } = playerIdStore();
  const { setLoader } = loaderStore();

  const [question, setQuestion] = useState({});
  const [questionNumber, setQuestionNumber] = useState(1);
  const [alternativeNumber, setAlternativeNumber] = useState(1);

  useEffect(() => {
    if(phase !== 2) {
      navigate("/");
    }
  }, []);

  const listQuestion = async() => {
    const data = {
      playerId,
      questionNumber
    }

    setLoader(true);
    const response = await axios.post('https://jsdz6bisv3.execute-api.us-east-1.amazonaws.com/dev/v1/api/list-question',data);

    if(response.data.code === 1) {
      setQuestion(response.data.data);
    }else if(response.data.code === 2){
      navigate("/juego-terminado", {state: {
        playerId,
        timeTakesRespond: `${minutes}:${seconds}`
      }});
    }

    setLoader(false);
  }

  useEffect( () => {
    listQuestion();
  }, [questionNumber]);

  const { register, handleSubmit, formState:{ errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(TriviaSchema),
    defaultValues: {
      alternativeNumber: 0
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
    const response = await axios.post('https://jsdz6bisv3.execute-api.us-east-1.amazonaws.com/dev/v1/api/register-question',data);

    setLoader(false);
    setQuestionNumber(questionNumber + 1);
    setAlternativeNumber(1);
  } 

  return (
      <div className="container-trivia">

        <div>
          <img src={logoTrivia} alt="logo_trivia" />
        </div>
        <div>
          <p>Pona a prueba sus conocimientos del mundo del futbol</p>
          <p>Para completar la trivia usted debe responder 25 preguntas en <span className="timer">2:00</span> minutos</p>
          <p>Tiempo transcurrido: <span className="timer">{`${minutes}:${seconds}`}</span></p>
        </div>
        <div>
          <p>{question.text ? `${questionNumber}.- ${question.text}`: ""}</p>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div onChange={onChangeValue}>
              {question.Alternatives ? question.Alternatives.map((alternative, index) => (
                <div key={index + 1}> 
                  <input checked={alternativeNumber===alternative.number} value={alternative.number} type="radio" name="alternativeNumber"  {...register('alternativeNumber')}/>
                  <label>{alternative.text}</label>
                </div>
              )) : null}
              <p>{errors?.alternativeNumber?.message}</p>
              </div>
              <button type="submit">Siguiente</button>
            </form>
          </div>
        </div>
        <div>
          <Progressbar bgcolor="#760B24" progress='30'  height={30} />
        </div>
      </div>
  );
}

export default Question;