/**
 * Centralized Mock Data for Citizen Grievance Redressal
 * TEMPORARY MOCK IMPLEMENTATION — To be replaced when backend Supabase contracts are finalized.
 */
export const initialMockGrievances = [
  {
    id: 'GRV-2026-8821',
    subject: 'Delay in Document Verification for Post-Matric Scholarship',
    category: 'Document Verification',
    schemeName: 'Post-Matric Scholarship for OBC Students',
    description: 'Submitted Income Certificate and 12th Marksheet 2 weeks ago, but portal status still shows pending verification at block level.',
    submittedDate: '2026-08-12',
    status: 'In Progress', // Submitted, In Progress, Resolved, Rejected
    assignedAuthority: 'District Nodal Officer, Patna Welfare Cell',
    timeline: [
      { step: 'Grievance Registered', date: '2026-08-12', completed: true },
      { step: 'Assigned to Nodal Officer', date: '2026-08-14', completed: true },
      { step: 'Verification Underway', date: '2026-08-18', completed: true },
      { step: 'Final Resolution', date: 'Pending', completed: false }
    ]
  },
  {
    id: 'GRV-2026-9043',
    subject: 'Incorrect Income Limit Discrepancy on Portal',
    category: 'Eligibility Query',
    schemeName: 'General Higher Education Grant',
    description: 'Annual family income is ₹2,20,000 but system tagged income as exceeding limit.',
    submittedDate: '2026-08-01',
    status: 'Resolved',
    assignedAuthority: 'SevaSetu Helpdesk Support',
    resolutionNotes: 'Income criteria rule re-evaluated. Profile eligibility updated successfully.',
    timeline: [
      { step: 'Grievance Registered', date: '2026-08-01', completed: true },
      { step: 'Assigned to Tech Support', date: '2026-08-02', completed: true },
      { step: 'Issue Resolved', date: '2026-08-03', completed: true }
    ]
  }
];

export default initialMockGrievances;
