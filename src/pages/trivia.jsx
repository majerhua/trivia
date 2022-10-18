import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { TriviaSchema } from '../schema/schema';
import { useNavigate } from "react-router-dom";
import { phaseStore, playerIdStore, loaderStore } from '../store';
import axios from 'axios';

const Trivia = () => {

  const navigate = useNavigate();
  const { phase } = phaseStore();
  const { playerId } = playerIdStore();
  const { setLoader } = loaderStore();

  const [question, setQuestion] = useState({});
  const [questionNumber, setQuestionNumber] = useState(1);

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
    setLoader(false);
    setQuestion(response.data.data);
    console.log("Pregunta Generada => ",response)
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
  } 

  return (
    <>
      <h1>Pona a prueba sus conocimientos del mundo del fútbol</h1>
      <p>Para completar la trivia usted debe responder 50 preguntas</p>
      <p>{question.text ? `${questionNumber}.- ${question.text}`: ""}</p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {question.Alternatives ? question.Alternatives.map((alternative, index) => (
            <div key={index + 1}> 
              <input value={alternative.number} type="radio" name="alternativeNumber"  {...register('alternativeNumber')}/>
              <label>{alternative.text}</label>
            </div>
          )) : null}
          <button type="submit">Siguiente</button>
        </form>
      </div>
    </>
  );
}

export default Trivia;