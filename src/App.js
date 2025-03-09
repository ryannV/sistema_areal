import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/screens/Login';
import Main from './components/screens/Main';
import Abastecimento from './components/screens/Abastecimento';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/abastecimento" element={<Abastecimento />} />
      </Routes>
    </Router>
  );
}

export default App;
