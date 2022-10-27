import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Trivia from './pages/trivia';
import GameOver from './pages/game-over';
import ResetTrivia from './pages/reset-trivia';
import GeneralRanking from './pages/general-ranking';
import GeneralRankingExport from './pages/general-ranking-export';
import { loaderStore, userStore } from './store';
import Loader from './components/loader';
import ProtectedRoute from './components/protected-route';

const COUNTER = 15 * 60 ;

function App() {

  const { loader } = loaderStore();
  const { user } = userStore();
  
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
          <Route path="/ranking-general-export" element={<GeneralRankingExport/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/limpiar-ranking" 
          element={
            <ProtectedRoute user={user}>
              <ResetTrivia />
            </ProtectedRoute>
          }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
