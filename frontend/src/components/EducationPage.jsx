import React, { useState } from 'react';

const EducationPage = ({ userProfile, setUserProfile, onNext }) => {
  const [highSchoolGrad, setHighSchoolGrad] = useState(userProfile.completed_highschool ?? null);
  const [collegeExp, setCollegeExp] = useState(userProfile.attended_college ?? null);
  const [major, setMajor] = useState(userProfile.college_major ?? '');
  const [degree, setDegree] = useState(userProfile.highest_degree ?? '');

  const handleSubmit = () => {
    if (highSchoolGrad === null) {
      alert("Please answer whether you are a high school graduate.");
      return;
    }

    if (highSchoolGrad && collegeExp === null) {
      alert("Please answer whether you have attended college or taken any college level coursework.");
      return;
    }

    if (highSchoolGrad && collegeExp) {
      if (!major.trim()) {
        alert("Please enter your college major.");
        return;
      }

      if (!degree) {
        alert("Please select your highest completed degree.");
        return;
      }
    }

    setUserProfile((prev) => ({
      ...prev,
      completed_highschool: highSchoolGrad,
      attended_college: collegeExp,
      finished_college: degree !== '' && degree !== 'none',
      highest_degree: degree !== '' && degree !== 'none' ? degree : null,
      college_major: collegeExp && degree !== 'none' ? major : null,
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
      <h2 className="text-4xl font-bold mb-6">Education</h2>

      <p className="text-xl mb-2">Are you a high school graduate (or equivalent)?</p>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setHighSchoolGrad(true)} className={buttonClass(highSchoolGrad === true)}>
          Yes
        </button>
        <button
          onClick={() => {
            setHighSchoolGrad(false);
            setCollegeExp(false);
            setMajor('');
            setDegree('');
          }}
          className={buttonClass(highSchoolGrad === false)}
        >
          No
        </button>
      </div>

      {highSchoolGrad && (
        <>
          <p className="text-xl mb-2">Have you attended college or taken any college level coursework?</p>
          <div className="flex gap-4 mb-6">
            <button onClick={() => setCollegeExp(true)} className={buttonClass(collegeExp === true)}>
              Yes
            </button>
            <button
              onClick={() => {
                setCollegeExp(false);
                setMajor('');
                setDegree('');
              }}
              className={buttonClass(collegeExp === false)}
            >
              No
            </button>
          </div>

          {collegeExp && (
            <>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Your college major"
                className="bg-[#1f1f1f] text-white placeholder-gray-400 px-4 py-2 rounded-md mb-6 w-64 border border-gray-600 font-mono"
              />

              <p className="text-xl mb-2">Highest degree completed:</p>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="bg-[#1f1f1f] text-white px-4 py-2 rounded-md mb-6 w-64 border border-gray-600 hover:bg-[#00308F]"
              >
                <option value="">-- Select one --</option>
                <option value="none">None</option>
                <option value="associates">Associate’s</option>
                <option value="bachelors">Bachelor’s</option>
                <option value="masters">Master’s</option>
              </select>
            </>
          )}
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

export default EducationPage;
