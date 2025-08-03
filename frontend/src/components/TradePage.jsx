import React, { useState } from 'react';

const tradeOptions = [
  "Electrical",
  "Plumbing",
  "HVAC",
  "Construction",
  "Automotive Repair",
  "Welding",
  "Mechanical Systems",
  "Machining",
  "Other"
];

const TradePage = ({ userProfile, setUserProfile, onNext }) => {
  const [hasTradeExperience, setHasTradeExperience] = useState(
    userProfile.trade_experience && userProfile.trade_experience.length > 0
  );
  const [selectedTrades, setSelectedTrades] = useState(
    userProfile.trade_experience ?? []
  );

  const handleToggle = (trade) => {
    setSelectedTrades((prev) =>
      prev.includes(trade)
        ? prev.filter((t) => t !== trade)
        : [...prev, trade]
    );
  };

  const handleSubmit = () => {
    if (hasTradeExperience === null) {
      alert("Please answer whether you have experience in trades.");
      return;
    }

    if (hasTradeExperience && selectedTrades.length === 0) {
      alert("Please select at least one trade experience.");
      return;
    }

    setUserProfile((prev) => ({
      ...prev,
      trade_experience: hasTradeExperience ? selectedTrades : [],
    }));

    onNext();
  };

  const buttonClass = (selected) =>
    `px-6 py-2 rounded font-semibold transition-colors ${
      selected ? "bg-[#00308F] text-white" : "bg-gray-700 text-white hover:bg-[#00308F]"
    }`;

  return (
    <div className="min-h-screen bg-black text-[#A9A9A9] flex flex-col justify-center items-center px-6">
      <a
        href="https://www.airforce.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/af-logo.png" alt="U.S. Air Force Logo" className="w-24 h-auto mb-4" />
      </a>
      <h2 className="text-4xl font-bold mb-6">Trade Experience</h2>

      <p className="text-xl mb-2">Do you have any experience in trades?</p>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setHasTradeExperience(true)}
          className={buttonClass(hasTradeExperience === true)}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setHasTradeExperience(false);
            setSelectedTrades([]);
          }}
          className={buttonClass(hasTradeExperience === false)}
        >
          No
        </button>
      </div>

      {hasTradeExperience && (
        <>
          <p className="text-xl mb-2">What kind of trade experience do you have?</p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {tradeOptions.map((trade) => (
              <button
                key={trade}
                onClick={() => handleToggle(trade)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  selectedTrades.includes(trade)
                    ? "bg-[#00308F] text-white"
                    : "bg-gray-700 text-white hover:bg-[#1C4DA1]"
                }`}
              >
                {trade}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        onClick={handleSubmit}
        className="bg-[#4B5055] text-black px-10 py-3 rounded-lg font-semibold hover:bg-[#00308F]"
      >
        NEXT
      </button>
    </div>
  );
};

export default TradePage;
