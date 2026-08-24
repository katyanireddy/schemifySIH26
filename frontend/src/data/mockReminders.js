/**
 * Centralized Mock Data for Citizen Reminders & Alerts
 * TEMPORARY MOCK IMPLEMENTATION — To be replaced when backend Supabase contracts are finalized.
 */
export const initialMockReminders = [
  {
    id: 'rem-501',
    title: 'Post-Matric Scholarship Portal Deadline Closing',
    category: 'Deadline Alert',
    dueDate: '2026-09-30',
    urgency: 'High', // High, Medium, Low
    daysRemaining: 37,
    relatedType: 'Opportunity',
    relatedId: 'opp-saved-1',
    relatedLink: '/opportunities',
    notes: 'Ensure Income Certificate and Marksheets are uploaded before submitting final application.'
  },
  {
    id: 'rem-502',
    title: 'OBC Category Certificate Renewal Required',
    category: 'Document Expiry',
    dueDate: '2026-08-31',
    urgency: 'High',
    daysRemaining: 7,
    relatedType: 'Document',
    relatedId: 'doc-105',
    relatedLink: '/documents',
    notes: 'Current certificate is expiring. Apply for NCL renewal at local Block Development Office.'
  },
  {
    id: 'rem-503',
    title: 'PM Youth Internship Portal Round 2 Opening',
    category: 'Application Reminder',
    dueDate: '2026-10-01',
    urgency: 'Medium',
    daysRemaining: 38,
    relatedType: 'Application',
    relatedId: 'app-302',
    relatedLink: '/applications',
    notes: 'Check status for offer letter acceptance.'
  }
];

export default initialMockReminders;
