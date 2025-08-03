import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GeneratePage = ({ userProfile }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    console.log("Full UserProfile being sent to backend:");
    console.log(JSON.stringify(userProfile, null, 2));

    try {
      const res = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile),
      });

      if (!res.ok) throw new Error("Backend returned an error");

      const data = await res.json();
      console.log("AFSC Recommendations:", data);

      localStorage.setItem("recommendations", JSON.stringify(data));
      navigate("/results");
    } catch (error) {
      console.error("Error generating recommendations:", error);
      alert("Something went wrong generating AFSCs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#A9A9A9] flex flex-col items-center justify-center px-6">
      <a
        href="https://www.airforce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/af-logo.png" alt="U.S. Air Force Logo" className="w-24 h-auto mb-4" />
      </a>      

      <h2 className="text-4xl font-bold mb-4 text-center">You're all set!</h2>
      <p className="text-xl text-center mb-8 max-w-xl">
        All questions are complete. Press the button below to receive your AI-generated list of recommended Air Force AFSCs.
      </p>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`px-10 py-4 rounded-lg font-semibold transition-colors ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#00308F] text-white hover:bg-[#1C4DA1]"
        }`}
      >
        {loading ? "Generating..." : "Generate My Matches"}
      </button>
    </div>
  );
};

export default GeneratePage;
