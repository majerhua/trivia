import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '../schema/schema';
import Input from '../components/input';
import Select from '../components/select';
import Radio from '../components/radio';
import Button from '../components/button';
import { phaseStore, playerIdStore, loaderStore } from '../store';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/pages/register.css';
import logoTriviaRed from '../assets/imagenes/trivia-qatar-rojo.svg';
import { BASE_URL } from '../config/api';

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
      terms_conditions: false
    }
  });

  const onSubmit = async (data) => {
    setLoader(true);
    try{
      const response = await axios.post(`${BASE_URL}/register-player`,data);
      if(response.data.code === 1) {
        setPlayerId(response.data.data.id);
        setPhase(2);
        navigate("/trivia");
      }else{ 
        alert('No es posible continuar con el juego porque no hay un juego creado, comuniquese con el diario La Nación por favor.')
      }
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
                  <input type="checkbox" name="terms-conditions" id="terms-conditions"  {...register('terms_conditions')} errors={errors}/>
                  <label htmlFor="terms-conditions"><a className='link-terms-conditions' rel="noreferrer" target='_blank' href='https://www.nacion.com/gnfactory/comercial/2022/reglamentotrivia2022qatar/reglamento.pdf'>Acepto términos y condiciones</a></label>
                </div>
                <p className="error text-center">{errors['terms_conditions']?.message}</p>
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