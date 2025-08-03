import React, { useState } from 'react';

const AgePage = ({ userProfile, setUserProfile, onNext }) => {
  const [age, setAge] = useState(userProfile.age ?? '');

  const handleNext = () => {
    if (!age || isNaN(age) || age <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    setUserProfile((prev) => ({
      ...prev,
      age: parseInt(age),
    }));

    onNext();
  };

  return (
    <div className="min-h-screen bg-black text-[#A9A9A9] flex flex-col justify-center items-center px-6">
      <a
        href="https://www.airforce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/af-logo.png" alt="U.S. Air Force Logo" className="w-24 h-auto mb-4" />
      </a>

      <h2 className="text-4xl font-bold mb-6">Age</h2>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={age}
        onChange={(e) => {
          const input = e.target.value;
          if (/^\d*$/.test(input)) setAge(input);
        }}
        placeholder="Enter your age"
        className="bg-[#1f1f1f] text-white placeholder-gray-400 px-4 py-2 rounded-md mb-6 w-64 text-lg border border-gray-600"
      />

      <button
        onClick={handleNext}
        className="bg-[#4B5055] text-black px-10 py-3 rounded-lg font-semibold hover:bg-[#00308F]"
      >
        NEXT
      </button>
    </div>
  );
};

export default AgePage;
