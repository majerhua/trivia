import { useNavigate } from "react-router-dom";
import { phaseStore } from '../store';
import '../css/pages/home.css';
import logoTrivia from '../assets/imagenes/logo-trivia.svg';

const Home = () => {
  const { setPhase } = phaseStore();
  const navigate = useNavigate();

  const handleClick = ()=> {
    navigate("/registro");
    setPhase(1);
  }

  return (
    <>
      <div className="container">
        <img src={logoTrivia} alt="logo_trivia" className="logo-trivia" />
        <div className="absolute-content">
          <h3>Pon a prueba sus conocimientos del mundo del fútbol</h3>
          <button type="button" onClick={ handleClick }>JUGAR</button> 
        </div>
          
      </div>
    </>
    
  );
}

export default Home;