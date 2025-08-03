import React, { useState } from 'react';

const AdditionalInfoPage = ({ userProfile, setUserProfile, onNext }) => {
  const [additionalInfo, setAdditionalInfo] = useState(userProfile.additional_info || "");

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleSubmit = () => {
    const wordCount = countWords(additionalInfo);
    if (wordCount > 500) {
      alert(`Please limit your response to 500 words. You’ve written ${wordCount} words.`);
      return;
    }

    setUserProfile((prev) => ({
      ...prev,
      additional_info: additionalInfo,
    }));

    onNext();
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

      <h2 className="text-4xl font-bold mb-4 text-center">Tell Us More About You</h2>
      <p className="text-xl text-center mb-6 max-w-xl">
        Anything else you'd like to share? Feel free to tell us about your hobbies, professional experiences, career goals, favorite class, or anything you think might help us find the right AFSCs for you.
      </p>

      <textarea
        rows="6"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        placeholder="I enjoy coding side projects, weightlifting, and learning about space. After the military, I hope to..."
        className="w-full max-w-2xl bg-[#1f1f1f] text-white placeholder-gray-400 px-4 py-3 rounded-md border border-gray-600 mb-2 font-mono"
      />

      <p className="text-sm text-gray-400 mb-6">
        Word Count: {countWords(additionalInfo)} / 500
      </p>

      <button
        onClick={handleSubmit}
        className="bg-[#4B5055] text-black px-10 py-3 rounded-lg font-semibold hover:bg-[#00308F]"
      >
        NEXT
      </button>
    </div>
  );
};

export default AdditionalInfoPage;
