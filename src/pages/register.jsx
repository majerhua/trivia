import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../schema/schema';
import Input from '../components/input';
import Select from '../components/select';
import Radio from '../components/radio';
import Button from '../components/button';
import { phaseStore, playerIdStore, loaderStore } from '../store';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/pages/register.css';
import logoTriviaRed from '../assets/imagenes/trivia-qatar-rojo.svg';

const Register = () => {

  const navigate = useNavigate();
  const { phase, setPhase } = phaseStore();
  const { setPlayerId } = playerIdStore();
  const { setLoader } = loaderStore();

  useEffect(() => {
    if(phase !== 1) {
      navigate("/");
    }
  }, []);

  const { register, handleSubmit, formState:{ errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      identity_document: "",
      type_document: "",
      phone: "",
      is_suscriptor: "",
      terms_conditions: ""
    }
  });

  const onSubmit = async (data) => {
    setLoader(true);
    try{
      const response = await axios.post('https://jsdz6bisv3.execute-api.us-east-1.amazonaws.com/dev/v1/api/register-player',data);
      setPlayerId(response.data.data.id);
      setPhase(2);
      navigate("/trivia");
    }catch(ex){
      alert(ex.message);
      setLoader(false);
    }
  }

  return (
    <>
      <div className="container-register">
        <div className="container-register-form">
          <div className="container-logo">
            <img src={logoTriviaRed} alt="logo_trivia" className="logo-trivia-register" />
          </div>
          <p>Para comenzar</p>
          <p>complete la siguiente información</p>
          <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Su nombre:" name="name" register={register} errors={errors}/>
            <Select label="Tipo de documento:" name="type_document" register={register} errors={errors}/>
            <Input label="Documento de identidad:" name="identity_document" register={register} errors={errors}/>
            <Input label="Número de telefono:" name="phone" register={register} errors={errors}/>
            <Input label="Correo electrónico:" name="email" register={register} errors={errors}/>
            <Radio label="¿Es suscriptor de la Nación?:" name="is_suscriptor" register={register} errors={errors}/>
            <div className="container-field">
              <div className="container-terms-conditions">
                <div>
                  <input type="radio" id="terms-conditions" value="1" {...register('terms_conditions')}errors={errors}/>
                  <label htmlFor="terms-conditions">Acepto términos y condiciones</label>
                </div>
                <p className="error">{errors['terms_conditions']?.message}</p>
              </div>
            </div>
            <div className="container-button">
              <Button text="Comenzar"/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;