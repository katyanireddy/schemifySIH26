/**
 * Centralized Mock Data for Applications Tracker
 * TEMPORARY MOCK IMPLEMENTATION — To be replaced when backend Supabase contracts are finalized.
 */
export const initialMockApplications = [
  {
    id: 'app-301',
    opportunityId: 'opp-post-matric-bihar',
    opportunityName: 'Post-Matric Scholarship for OBC Students (Bihar)',
    type: 'Scholarship',
    appliedDate: '2026-08-10',
    deadline: '2026-09-30',
    status: 'Under Review', // Not Applied, In Progress, Applied, Under Review, Approved, Rejected
    department: 'Department of Backward Classes Welfare, Bihar',
    trackingNumber: 'SEVA-2026-88491',
    timeline: [
      { step: 'Application Submitted', date: '2026-08-10', completed: true },
      { step: 'Document Verification', date: '2026-08-14', completed: true },
      { step: 'Nodal Officer Approval', date: '2026-08-20', completed: true },
      { step: 'Disbursement Queue', date: 'Pending', completed: false }
    ]
  },
  {
    id: 'app-302',
    opportunityId: 'opp-pm-youth-internship',
    opportunityName: 'PM Youth Internship Scheme for Engineering & Tech',
    type: 'Internship',
    appliedDate: '2026-08-18',
    deadline: '2026-10-15',
    status: 'Approved',
    department: 'Ministry of Skill Development & Entrepreneurship',
    trackingNumber: 'SEVA-2026-90214',
    timeline: [
      { step: 'Application Submitted', date: '2026-08-18', completed: true },
      { step: 'Screening Completed', date: '2026-08-21', completed: true },
      { step: 'Offer Letter Issued', date: '2026-08-23', completed: true }
    ]
  }
];

export default initialMockApplications;
