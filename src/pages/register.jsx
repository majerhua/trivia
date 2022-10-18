import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../schema/schema';
import Input from '../components/input';
import Select from '../components/select';
import { phaseStore, playerIdStore, loaderStore } from '../store';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();
  const { phase, setPhase } = phaseStore();
  const { setPlayerId } = playerIdStore();
  const { setLoader } = loaderStore();

  const [isSuscriptor, setIsSuscriptor] = useState('0');

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
      is_suscriptor: ""
    }
  });

  const onSubmit = async (data) => {
    setLoader(true);
    const response = await axios.post('https://jsdz6bisv3.execute-api.us-east-1.amazonaws.com/dev/v1/api/register-player',data);
    setLoader(false);
    setPlayerId(response.data.data.id);
    setPhase(2);
    navigate("/trivia");
  }

  const onChangeValue = (event) => {
    setIsSuscriptor(event.target.value);
  }

  return (
    <>
      <h1>Para comenzar complete la siguiente información</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Su nombre:" name="name" register={register} errors={errors}/>
        <Input label="Correo electrónico:" name="email" register={register} errors={errors}/>
        <Input label="Documento de identidad:" name="identity_document" register={register} errors={errors}/>
        <Input label="Número de telefono:" name="phone" register={register} errors={errors}/>
        <Select label="Tipo de documento:" name="type_document" register={register} errors={errors}/>
        <div onChange={onChangeValue}>
          <label>¿Es suscriptor de la Nación?:</label>
          <input type="radio" id="yes" value="1" checked={isSuscriptor==='1'} {...register('is_suscriptor')}errors={errors}/>
          <label htmlFor="yes">Si</label>
          <input type="radio" id="no" value="0" checked={isSuscriptor==='0'} {...register('is_suscriptor')} errors={errors}/>
          <label htmlFor="no">No</label>
        </div>
        <button type="submit">Comenzar</button>
      </form>
    </>
  );
}

export default Register;