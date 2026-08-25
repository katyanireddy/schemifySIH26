import apiClient from './apiClient';
import { getCurrentUserId } from './userService';

export const applicationService = {
  getApplications: async () => {
    const userId = getCurrentUserId();
    const response = await apiClient.get(`/applications/user/${userId}`);
    const resData = response.data?.data || response.data || [];
    const rawApps = Array.isArray(resData) ? resData : [];

    return rawApps.map((app) => {
      const rawStatus = (app.status || 'applied').toLowerCase();
      let displayStatus = 'Applied';
      if (rawStatus === 'approved') displayStatus = 'Approved';
      else if (rawStatus === 'under_review') displayStatus = 'Under Review';
      else if (rawStatus === 'saved') displayStatus = 'Saved';
      else if (rawStatus === 'rejected') displayStatus = 'Rejected';
      else if (rawStatus === 'withdrawn') displayStatus = 'Withdrawn';

      const opp = app.opportunity || app.opportunities || {};
      const appliedDate = app.application_date || (app.created_at ? app.created_at.split('T')[0] : new Date().toISOString().split('T')[0]);

      return {
        id: app.id || app.application_id,
        opportunityId: app.opportunity_id,
        opportunityName: opp.name || app.opportunity_name || 'Government Opportunity',
        type: opp.type || app.opportunity_type || 'Scholarship',
        appliedDate,
        deadline: opp.deadline || app.deadline || '2026-12-31',
        status: displayStatus,
        department: opp.department || app.department || 'Central/State Nodal Portal',
        trackingNumber: app.application_reference || `SEVA-2026-${(app.id || '10001').slice(-5)}`,
        notes: app.notes || '',
        timeline: [
          { step: 'Application Submitted', date: appliedDate, completed: true },
          { step: 'Nodal Verification', date: rawStatus === 'approved' ? appliedDate : 'Underway', completed: rawStatus === 'approved' || rawStatus === 'under_review' },
          { step: 'Disbursement Release', date: rawStatus === 'approved' ? 'Completed' : 'Pending', completed: rawStatus === 'approved' }
        ]
      };
    });
  },

  createApplication: async (opportunity) => {
    const userId = getCurrentUserId();
    const oppId = opportunity.id || opportunity.opportunity_id;

    const payload = {
      user_id: userId,
      opportunity_id: oppId,
      status: 'applied',
      application_date: new Date().toISOString().split('T')[0],
      application_reference: `SEVA-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      notes: `Applied via SevaSetu Portal for ${opportunity.name || 'Opportunity'}`
    };

    const response = await apiClient.post('/applications', payload);
    const app = response.data?.data || response.data;

    return {
      id: app.id || app.application_id,
      opportunityId: oppId,
      opportunityName: opportunity.name || 'Government Opportunity',
      type: opportunity.type || 'Scholarship',
      appliedDate: app.application_date || new Date().toISOString().split('T')[0],
      deadline: opportunity.deadline || '2026-12-31',
      status: 'Applied',
      department: opportunity.department || 'Central/State Nodal Portal',
      trackingNumber: app.application_reference || payload.application_reference,
      notes: app.notes,
      timeline: [
        { step: 'Application Submitted', date: new Date().toISOString().split('T')[0], completed: true },
        { step: 'Verification Underway', date: 'Pending', completed: false }
      ]
    };
  },

  updateApplicationStatus: async (applicationId, newStatus, notes = null) => {
    let rawStatus = newStatus.toLowerCase().replace(/\s+/g, '_');
    if (rawStatus === 'under_review' || rawStatus === 'underreview') rawStatus = 'under_review';

    const payload = {
      status: rawStatus,
      application_date: new Date().toISOString().split('T')[0],
      notes
    };

    const response = await apiClient.patch(`/applications/${applicationId}`, payload);
    return response.data?.data || response.data;
  }
};

export default applicationService;
