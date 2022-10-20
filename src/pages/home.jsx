import { useNavigate } from "react-router-dom";
import { phaseStore } from '../store';
import '../css/pages/home.css';
import Button from '../components/button';
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
          <h3>Pona a prueba sus conocimientos <br/> del mundo del fútbol</h3>
          <Button text="JUGAR" handleClick={handleClick} />
        </div>
          
      </div>
    </>
    
  );
}

export default Home;