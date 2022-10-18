import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Trivia from './pages/trivia';
import { loaderStore } from './store';
import Loader from './components/loader';

function App() {

  const { loader } = loaderStore();

  return (
    <>
      {loader ? <Loader/> : null}
      <Router basename={'/'}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/registro" element={<Register/>} />
          <Route path="/trivia" element={<Trivia/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
