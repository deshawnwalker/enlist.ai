import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [afscList, setAfscList] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("recommendations");

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);

        const recommendations = typeof parsed.recommendations === "string"
          ? JSON.parse(parsed.recommendations)
          : parsed.recommendations;

        setAfscList(recommendations);
      } catch (err) {
        console.error("Failed to parse GPT recommendations:", err);
        setAfscList([]);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#A9A9A9] flex flex-col items-center px-6 py-10">
      <a
        href="https://www.airforce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/af-logo.png" alt="U.S. Air Force Logo" className="w-24 h-auto mb-6" />
      </a>

      <h1 className="text-4xl font-bold text-center text-white">Your Top AFSC Matches</h1>
        <p className="text-center font-bold text-sm text-gray-400 mb-8">
        Click the Air Force logo to reach a recruiter.
        </p>

      {afscList.length > 0 ? (
        afscList.map((job, index) => (
          <div
            key={index}
            className="bg-[#1f1f1f] text-white rounded-xl shadow-md p-6 mb-6 w-full max-w-2xl border border-gray-700 transition-all duration-150 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-[#1C4DA1] mb-3">
              {job.code}: {job.title}
            </h2>
            <p className="text-[#D3D3D3] mb-4 font-mono">
              <strong>Summary:</strong> {job.summary}
            </p>
            <p className="text-[#D3D3D3] font-mono">
              <strong>Why it's a good fit:</strong> {job.justification}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No recommendations found. Please go back and try again.
        </p>
      )}

      <button
        className="mt-10 bg-[#4B5055] text-white px-10 py-3 rounded-lg font-semibold hover:bg-[#00308F] transition-colors"
        onClick={() => navigate("/form")}
      >
        Back to Form
      </button>
    </div>
  );
};

export default ResultsPage;
