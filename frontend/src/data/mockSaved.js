/**
 * Centralized Mock Data for Saved Opportunities
 * TEMPORARY MOCK IMPLEMENTATION — To be replaced when backend Supabase contracts are finalized.
 */
export const initialMockSaved = [
  {
    id: 'opp-saved-1',
    name: 'Post-Matric Scholarship for SC/ST/OBC Students',
    type: 'scholarship',
    description: 'Post-matric financial assistance for eligible SC/ST/OBC students pursuing recognized undergraduate and diploma courses.',
    benefits: 'Tuition fee reimbursement up to ₹50,000 per year + maintenance allowance.',
    deadline: '2026-09-30',
    match_score: 94,
    status: 'eligible',
    matched_conditions: ['State: Bihar', 'Category: OBC', 'Income: < ₹2.5 Lakh', 'Course: B.Tech'],
    missing_conditions: [],
    official_url: 'https://scholarships.gov.in'
  },
  {
    id: 'opp-saved-2',
    name: 'SERB Power Research Fellowship for Women Engineers',
    type: 'fellowship',
    description: 'Special research fellowship rewarding promising women engineers and scientists in recognized academic institutions.',
    benefits: '₹15,000 per month fellowship stipend plus annual research grant of ₹10 Lakhs.',
    deadline: '2026-11-15',
    match_score: 85,
    status: 'near_eligible',
    matched_conditions: ['Gender: Female', 'Course: B.Tech', 'State: Bihar'],
    missing_conditions: ['Requires 2nd-year completion or higher'],
    improvements: ['Re-apply after completing 1st year semester exams.'],
    official_url: 'https://serbonline.in'
  }
];

export default initialMockSaved;
