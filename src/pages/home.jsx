import { useNavigate } from "react-router-dom";
import { phaseStore } from '../store';

const Home = () => {
  const { setPhase } = phaseStore();
  const navigate = useNavigate();

  const handleClick = ()=> {
    navigate("/registro");
    setPhase(1);
  }


  return (
    <>
      <h1>Trivia</h1>
      <button type="button" onClick={ handleClick }>Jugar</button>
    </>
  );
}

export default Home;