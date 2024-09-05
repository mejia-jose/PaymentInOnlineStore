import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Store from './pages/Store';
import Detail from './pages/Detail';
import './index.css';
import Delivery from './pages/Delivery';
import Summary from './pages/Summary';
import FinalStatus from './pages/FinalStatus';
import NotFound from './pages/NoFound'; 
import Bpmn from './pages/BPMN';
import Modeler from './pages/Modeler';
import Loanding from './components/layout/Loanding';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) { return <Loanding />;} 
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/detail-delivery" element={<Delivery />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/final-status" element={<FinalStatus />} />
            <Route path="*" element={<NotFound />} />
            <Route path='/bpmn' element={ <Bpmn/>} />
            <Route path='/modelo' element={ <Modeler/>} />
        </Routes>
    </Router>

    </div> 
  );
}

export default App;
