import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { loaderStore, userStore } from '../store';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../components/button';
import axios from 'axios';
import { LoginSchema } from '../schema/schema';
import '../css/pages/login.css';
import logoTrivia from '../assets/imagenes/logo-trivia.svg';
import { BASE_URL } from '../config/api';

const Login = () => {

  const navigate = useNavigate();
  const { user } = userStore();


  useEffect(() => {
    if (user) {
      navigate('/limpiar-ranking');
    }
  },[]);

  const { setLoader } = loaderStore();
  const { setUser } = userStore();

  const { register, handleSubmit, formState:{ errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    setLoader(true);
    try{
      const response = await axios.post(`${BASE_URL}/login-user`,data);
      if(response.data.code === 1) {
        setUser(response.data.data);
        navigate("/limpiar-ranking");
      }else {
        alert("El usuario o contraseña es incorrecto");
      }
    }catch(ex){
      alert(ex.message);
    }
    setLoader(false);
  }

  return (
    <>
      <div className="container">
        <img src={logoTrivia} alt="logo_trivia" className="logo-trivia" />
        <div className="container-login">
          <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
            <div className="container-field">
              <label>Usuario</label>
              <input type="text" {...register("username")}/>
              <p className="error">{errors["username"]?.message}</p>
            </div>
            <div className="container-field">
              <label>Contraseña</label>
              <input type="password" {...register("password")}/>
              <p className="error">{errors["password"]?.message}</p>
            </div>
            <div className="container-button container-button-login">
              <Button text="Ingresar"/>
            </div>
          </form>
        </div>
      </div>
    </>
    
  );
}

export default Login;