import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import FormFlow from './components/UserForm';
import Footer from './components/Footer';
import ResultsPage from './components/ResultsPage';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/form" element={<FormFlow />} />
            <Route path="/results" element ={<ResultsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
