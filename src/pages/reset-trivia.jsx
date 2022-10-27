import { loaderStore } from '../store';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../components/button';
import { ResetTriviaSchema } from '../schema/schema';
import '../css/pages/login.css';
import logoTrivia from '../assets/imagenes/logo-trivia.svg';
import { BASE_URL } from '../config/api';

const ResetTrivia = () => {

  const { setLoader } = loaderStore();

  const { register, handleSubmit, formState:{ errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ResetTriviaSchema),
    defaultValues: {
      description: ""
    }
  });

  const onSubmit = async (data) => {
    setLoader(true);
    try{
      await axios.post(`${BASE_URL}/reset-game`,data);
        alert('El ranking de la trivia ha sido limpiado');
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
          <h3>Limpiar el ranking de la trivia</h3>
          <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
            <div className="container-field">
              <label>Descripción</label>
              <textarea type="text" {...register("description")}/>
              <p className="error">{errors["description"]?.message}</p>
            </div>
            <div className="container-button container-button-login">
              <Button text="Limpiar"/>
            </div>
          </form>
        </div>
      </div>
    </>
    
  );
}

export default ResetTrivia;