// TEMPORARY MOCK IMPLEMENTATION
// Replace with real backend API after backend contract is finalized.

import initialMockGrievances from '../data/mockGrievances';

let inMemoryGrievances = [...initialMockGrievances];

export const grievanceService = {
  getGrievances: async () => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      setTimeout(() => resolve([...inMemoryGrievances]), 100);
    });
  },

  getGrievanceById: async (id) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      const g = inMemoryGrievances.find((item) => item.id === id);
      setTimeout(() => resolve(g || null), 100);
    });
  },

  createGrievance: async (grievancePayload) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      const newGrievance = {
        id: `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: grievancePayload.subject || 'Citizen Portal Grievance',
        category: grievancePayload.category || 'General Service',
        schemeName: grievancePayload.schemeName || 'Government Scheme',
        description: grievancePayload.description || '',
        submittedDate: new Date().toISOString().split('T')[0],
        status: 'Submitted',
        assignedAuthority: 'SevaSetu Grievance Redressal Nodal Cell',
        attachmentName: grievancePayload.attachmentName || null,
        timeline: [
          { step: 'Grievance Registered', date: new Date().toISOString().split('T')[0], completed: true },
          { step: 'Assigned to Nodal Officer', date: 'Pending', completed: false }
        ]
      };
      inMemoryGrievances = [newGrievance, ...inMemoryGrievances];
      setTimeout(() => resolve(newGrievance), 150);
    });
  }
};

export default grievanceService;
