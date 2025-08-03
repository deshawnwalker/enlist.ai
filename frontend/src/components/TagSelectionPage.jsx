import React, { useState } from 'react';

const tagOptions = [
  "Operations", "Engineering", "Intelligence", "Medical", "Logistics", "Maintenance", "Transportation", "Communications",
  "Cybersecurity", "Administration", "Aviation", "Technical", "Mechanical", "Electrical", "Analytical", "Physical Fitness",
  "Communication", "Leadership", "Attention to Detail", "Troubleshooting", "Teamwork", "Aircraft", "Computers", "Machinery",
  "Field Work", "Lab Work", "Indoor Work", "Outdoor Work", "Classified Systems", "Remote Sensing", "Surveillance",
  "Combat Support", "Reconnaissance", "Humanitarian", "Tactical Support", "Nuclear Operations",
  "Cyber Operations", "Aircrew", "Combat",
];

const TagSelectionPage = ({ userProfile, setUserProfile, onNext }) => {
  const [selectedTags, setSelectedTags] = useState(userProfile.tag_interests ?? []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (selectedTags.length === 0) {
      alert("Please select at least one interest tag.");
      return;
    }

    setUserProfile((prev) => ({
      ...prev,
      tag_interests: selectedTags,
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
      <h2 className="text-4xl font-bold mb-6">Your Interests</h2>

      <p className="text-xl mb-2">Which of the following categories interest you? (Choose multiple)</p>
      <div className="flex flex-wrap gap-3 justify-center mb-6 max-w-3xl">
        {tagOptions.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedTags.includes(tag)
                ? "bg-[#00308F] text-white"
                : "bg-gray-700 text-white hover:bg-[#1C4DA1]"
            }`}
          >
            {tag}
          </button>
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

export default TagSelectionPage;
