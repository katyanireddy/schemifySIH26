import apiClient from './apiClient';

/**
 * Service for fetching personalized opportunity recommendations from backend.
 * Endpoint: POST /recommendations
 */
export const recommendationService = {
  getRecommendations: async (userProfile) => {
    // Format payload according to verified FastAPI UserProfile schema
    const payload = {
      age: Number(userProfile.age),
      state: String(userProfile.state || ''),
      category: String(userProfile.category || ''),
      annual_income: Number(userProfile.annual_income || 0),
      education_level: String(userProfile.education_level || ''),
      course: String(userProfile.course || ''),
      year_of_study: Number(userProfile.year_of_study || 1),
      gender: userProfile.gender ? String(userProfile.gender) : null,
      institution_type: userProfile.institution_type ? String(userProfile.institution_type) : null,
      percentage: userProfile.percentage !== undefined && userProfile.percentage !== '' ? Number(userProfile.percentage) : null,
      domicile_state: userProfile.domicile_state ? String(userProfile.domicile_state) : null,
      previous_qualification: userProfile.previous_qualification ? String(userProfile.previous_qualification) : null,
      disability: Boolean(userProfile.disability),
    };

    const response = await apiClient.post('/recommendations', payload);
    return response.data;
  },
};

export default recommendationService;
