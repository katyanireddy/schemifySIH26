import apiClient from './apiClient';
import { getCurrentUserId } from './userService';

export const savedService = {
  getSavedOpportunities: async () => {
    const userId = getCurrentUserId();
    const response = await apiClient.get(`/saved-opportunities/user/${userId}`);
    const resData = response.data?.data || response.data || [];
    const rawSaved = Array.isArray(resData) ? resData : [];

    return rawSaved.map((item) => {
      const opp = item.opportunity || item;
      return {
        id: opp.id || opp.opportunity_id || item.opportunity_id,
        name: opp.name || opp.title || 'Saved Opportunity',
        type: opp.type || 'Scholarship',
        category: opp.category || opp.type || 'Scholarship',
        description: opp.description || '',
        benefits: opp.benefits || 'Financial assistance and stipend support',
        deadline: opp.deadline || '2026-12-31',
        official_url: opp.official_url || opp.officialUrl || 'https://scholarships.gov.in',
        match_score: opp.match_score || 90,
        status: opp.status || 'Eligible'
      };
    });
  },

  saveOpportunity: async (opportunity) => {
    const userId = getCurrentUserId();
    const oppId = opportunity.id || opportunity.opportunity_id;

    const payload = {
      user_id: userId,
      opportunity_id: oppId
    };

    try {
      const response = await apiClient.post('/saved-opportunities', payload);
      return response.data?.data || response.data;
    } catch (error) {
      if (error.message && (error.message.includes('already') || error.message.includes('exist'))) {
        return { message: 'Already saved' };
      }
      throw error;
    }
  },

  removeSavedOpportunity: async (opportunityId) => {
    const userId = getCurrentUserId();
    const response = await apiClient.delete(`/saved-opportunities/${opportunityId}?user_id=${userId}`);
    return response.data || { success: true };
  }
};

export default savedService;
