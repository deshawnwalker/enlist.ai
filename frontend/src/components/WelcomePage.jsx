import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/form');
  };

  return (
    <div className="min-h-screen bg-black text-[#A9A9A9] flex flex-col justify-center items-center px-6">
      <a
        href="https://www.airforce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/af-logo.png" alt="U.S. Air Force Logo" className="w-30 h-auto mb-4" />
      </a>
      <h1 className="text-5xl font-extrabold mb-6">ENLIST.AI</h1>

      <p className="text-xl mb-4 text-center max-w-lg">
        ENLIST.AI helps you discover Air Force careers based on your strengths, interests, and life goals.
      </p>

      <p className="mb-1">Answer a few quick questions.</p>
      <p className="mb-1">Let AI analyze your inputs.</p>
      <p className="mb-6">Get personalized career matches in seconds.</p>

      <button
        onClick={handleGetStarted}
        className="bg-[#4B5055] text-black px-10 py-3 rounded-lg font-semibold hover:bg-[#00308F]"
      >
        GET STARTED
      </button>
    </div>
  );
};

export default WelcomePage;
