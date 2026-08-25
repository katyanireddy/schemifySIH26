import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('sevasetu_profile');
    const defaultData = {
      age: 19,
      state: 'Bihar',
      category: 'OBC',
      annual_income: 240000,
      education_level: 'Undergraduate',
      course: 'B.Tech',
      year_of_study: 1,
      gender: 'female',
      institution_type: 'Recognized regular college/university',
      percentage: 90,
      domicile_state: 'Bihar',
      previous_qualification: 'Class XII',
      disability: false,
      // Smart Education Student Extensions
      skills: ['Java', 'Python', 'Web Development', 'AI / ML'],
      interests: ['Artificial Intelligence', 'Software Development', 'Government Internships'],
      career_goal: 'Software Developer'
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultData,
          ...parsed,
          skills: parsed.skills || defaultData.skills,
          interests: parsed.interests || defaultData.interests,
          career_goal: parsed.career_goal || defaultData.career_goal
        };
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  const [recommendations, setRecommendations] = useState(() => {
    const saved = localStorage.getItem('sevasetu_recommendations');
    return saved ? JSON.parse(saved) : null;
  });

  const saveProfileData = (profileData, backendResponse) => {
    setProfile(profileData);
    setRecommendations(backendResponse);
    localStorage.setItem('sevasetu_profile', JSON.stringify(profileData));
    localStorage.setItem('sevasetu_recommendations', JSON.stringify(backendResponse));
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, recommendations, setRecommendations, saveProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
