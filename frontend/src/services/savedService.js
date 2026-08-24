// TEMPORARY MOCK IMPLEMENTATION
// Replace with real backend API after backend contract is finalized.

import initialMockSaved from '../data/mockSaved';

let inMemorySaved = [...initialMockSaved];

export const savedService = {
  getSavedOpportunities: async () => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      setTimeout(() => resolve([...inMemorySaved]), 100);
    });
  },

  saveOpportunity: async (opportunity) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      const oppId = opportunity.id || opportunity.name;
      const exists = inMemorySaved.some((item) => (item.id || item.name) === oppId);
      if (!exists) {
        inMemorySaved = [opportunity, ...inMemorySaved];
      }
      setTimeout(() => resolve({ success: true, saved: inMemorySaved }), 100);
    });
  },

  removeSavedOpportunity: async (opportunityId) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      inMemorySaved = inMemorySaved.filter((item) => (item.id || item.name) !== opportunityId);
      setTimeout(() => resolve({ success: true, saved: inMemorySaved }), 100);
    });
  }
};

export default savedService;
