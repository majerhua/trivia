import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Trivia from './pages/trivia';
import GameOver from './pages/game-over';
import GeneralRanking from './pages/general-ranking';
import { loaderStore } from './store';
import Loader from './components/loader';

const COUNTER = 15 * 60 ;

function App() {

  const { loader } = loaderStore();
  
  return (
    <>
      {loader ? <Loader/> : null}
      <Router basename={'/'}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/registro" element={<Register/>} />
          <Route path="/trivia" element={<Trivia counter={COUNTER}/>} />
          <Route path="/juego-terminado" element={<GameOver/>} />
          <Route path="/ranking-general" element={<GeneralRanking/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
