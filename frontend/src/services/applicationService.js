// TEMPORARY MOCK IMPLEMENTATION
// Replace with real backend API after backend contract is finalized.

import initialMockApplications from '../data/mockApplications';

let inMemoryApplications = [...initialMockApplications];

export const applicationService = {
  getApplications: async () => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      setTimeout(() => resolve([...inMemoryApplications]), 100);
    });
  },

  createApplication: async (opportunity) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      const newApp = {
        id: `app-${Date.now()}`,
        opportunityId: opportunity.id || `opp-${Date.now()}`,
        opportunityName: opportunity.name || 'Government Opportunity',
        type: opportunity.type || 'Scholarship',
        appliedDate: new Date().toISOString().split('T')[0],
        deadline: opportunity.deadline || '2026-12-31',
        status: 'Applied',
        department: opportunity.department || 'Central/State Nodal Portal',
        trackingNumber: `SEVA-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        timeline: [
          { step: 'Application Submitted', date: new Date().toISOString().split('T')[0], completed: true },
          { step: 'Verification Underway', date: 'Pending', completed: false }
        ]
      };
      inMemoryApplications = [newApp, ...inMemoryApplications];
      setTimeout(() => resolve(newApp), 150);
    });
  },

  updateApplicationStatus: async (applicationId, newStatus) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      inMemoryApplications = inMemoryApplications.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      );
      const updated = inMemoryApplications.find((a) => a.id === applicationId);
      setTimeout(() => resolve(updated), 100);
    });
  }
};

export default applicationService;
