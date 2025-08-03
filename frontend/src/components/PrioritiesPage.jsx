import React, { useState } from 'react';

const initialPriorities = [
  "Work-Life Balance",
  "Educational Opportunities",
  "Civilian Transferability",
  "Travel Opportunities",
  "Leadership & Responsibility",
  "Technical Skill Development",
  "Community & Purpose",
  "Adrenaline & Adventure"
];

const PrioritiesPage = ({ userProfile, setUserProfile, onNext }) => {
  const [priorities, setPriorities] = useState(userProfile.priorities.length > 0 ? userProfile.priorities : initialPriorities);

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...priorities];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setPriorities(updated);
  };

  const moveDown = (index) => {
    if (index === priorities.length - 1) return;
    const updated = [...priorities];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setPriorities(updated);
  };

  const handleSubmit = () => {
    if (priorities.length === 0) {
      alert("Please rank your priorities.");
      return;
    }

    setUserProfile((prev) => ({
      ...prev,
      priorities,
    }));

    onNext();
  };

  return (
    <div className="min-h-screen bg-black text-[#A9A9A9] flex flex-col items-center px-6 pt-10">
      <a
        href="https://www.airforce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/af-logo.png" alt="U.S. Air Force Logo" className="w-24 h-auto mb-4" />
      </a>

      <h2 className="text-4xl font-bold mb-6">Rank Your Priorities</h2>

      <p className="text-xl mb-4 text-center">Use the buttons to rank from least important (top) to most important (bottom).</p>

      <div className="w-full max-w-md space-y-3 mb-8">
        {priorities.map((priority, index) => (
          <div key={priority} className="bg-[#1f1f1f] text-white px-4 py-2 rounded-md flex justify-between items-center border border-gray-700">
            <span>{priority}</span>
            <div className="space-x-2">
              <button
                onClick={() => moveUp(index)}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-400 text-sm"
              >
                ↑
              </button>
              <button
                onClick={() => moveDown(index)}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-400 text-sm"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-[#4B5055] text-black px-10 py-3 rounded-lg font-semibold hover:bg-[#00308F]"
      >
        NEXT
      </button>
    </div>
  );
};

export default PrioritiesPage;
