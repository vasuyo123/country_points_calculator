import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import ShowDetailsPage from './showdetails/showdetails'; 
import './index.css';
import Tooltip from './Tootip/ToolTip';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details" element={<ShowDetailsPage />} />
      <Route path="/Tooltip" element={<Tooltip />} />
    </Routes>
  </Router>
);