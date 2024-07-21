import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Store from './pages/Store';
import Detail from './pages/Detail';
import './index.css';
import Delivery from './pages/Delivery';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/detail-delivery" element={<Delivery />} />
        </Routes>
      </Router>
    </div> 
  );
}

export default App;
