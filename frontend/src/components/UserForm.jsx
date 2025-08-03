import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AgePage from './AgePage';
import EducationPage from './EducationPage';
import TradePage from './TradePage';
import TagSelectionPage from './TagSelectionPage';
import PrioritiesPage from './PrioritiesPage';
import AdditionalInfoPage from './AdditionalInfoPage';
import GeneratePage from './GeneratePage';

const FormFlow = () => {

  const [step, setStep] = useState(0);

  const [userProfile, setUserProfile] = useState({
    age: null,
    completed_highschool: null,
    attended_college: null,
    finished_college: null,
    highest_degree: null,
    college_major: null,
    tag_interests: [],
    priorities: [],
    additional_info: "",
    trade_experience: [],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  console.log("Rendering FormFlow, step:", step);

  return (
    <>
      {step === 0 && (
        <AgePage
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onNext={nextStep}
        />
      )}
      {step === 1 && (
        <EducationPage
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <TradePage
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onNext={nextStep}
        />
      )}
      {step === 3 && (
        <TagSelectionPage
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onNext={nextStep}
        />
      )}
      {step === 4 && (
        <PrioritiesPage
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onNext={nextStep}
        />
      )}
      {step === 5 && (
        <AdditionalInfoPage
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onNext={nextStep}
        />
      )}
      {step === 6 && (
        <GeneratePage
          userProfile={userProfile}
        />
      )}
    </>
  );
};

export default FormFlow;
