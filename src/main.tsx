import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInput from './pages/UserInput';
import PlanningPoker from './pages/PlanningPoker';
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<UserInput />} />
        <Route path="/poker" element={<PlanningPoker />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
