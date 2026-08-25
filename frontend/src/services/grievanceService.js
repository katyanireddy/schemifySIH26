import apiClient from './apiClient';
import { getCurrentUserId } from './userService';

export const grievanceService = {
  getGrievances: async () => {
    const userId = getCurrentUserId();
    const response = await apiClient.get(`/grievances/user/${userId}`);
    const resData = response.data?.data || response.data || [];
    const rawGrievances = Array.isArray(resData) ? resData : [];

    return rawGrievances.map((g) => {
      const createdDate = g.created_at ? g.created_at.split('T')[0] : new Date().toISOString().split('T')[0];
      const rawStatus = (g.status || 'submitted').toLowerCase();

      let displayStatus = 'Submitted';
      if (rawStatus === 'under_review') displayStatus = 'Under Review';
      else if (rawStatus === 'resolved') displayStatus = 'Resolved';
      else if (rawStatus === 'rejected') displayStatus = 'Rejected';

      return {
        id: g.id || g.grievance_id,
        subject: g.subject || 'Citizen Portal Grievance',
        category: g.category || 'General Service',
        schemeName: g.opportunity ? g.opportunity.name : (g.schemeName || 'Government Scheme'),
        description: g.description || '',
        submittedDate: createdDate,
        status: displayStatus,
        assignedAuthority: g.assigned_authority || (g.admin_response ? 'Nodal Redressal Cell' : 'SevaSetu Grievance Nodal Cell'),
        adminResponse: g.admin_response || null,
        attachmentName: g.attachment_name || null,
        timeline: [
          { step: 'Grievance Registered', date: createdDate, completed: true },
          { step: 'Assigned to Nodal Officer', date: rawStatus !== 'submitted' ? createdDate : 'Underway', completed: rawStatus !== 'submitted' },
          { step: 'Final Resolution', date: rawStatus === 'resolved' ? createdDate : 'Pending', completed: rawStatus === 'resolved' }
        ]
      };
    });
  },

  getGrievanceById: async (grievanceId) => {
    const response = await apiClient.get(`/grievances/${grievanceId}`);
    const g = response.data?.data || response.data;
    if (!g) return null;

    const createdDate = g.created_at ? g.created_at.split('T')[0] : new Date().toISOString().split('T')[0];
    return {
      id: g.id || g.grievance_id,
      subject: g.subject,
      category: g.category,
      description: g.description,
      submittedDate: createdDate,
      status: g.status,
      adminResponse: g.admin_response
    };
  },

  createGrievance: async (grievancePayload) => {
    const userId = getCurrentUserId();

    const payload = {
      user_id: userId,
      opportunity_id: grievancePayload.opportunityId || grievancePayload.opportunity_id || null,
      category: grievancePayload.category || 'application_issue',
      subject: grievancePayload.subject || 'Citizen Portal Grievance',
      description: grievancePayload.description || 'Grievance submitted via portal'
    };

    const response = await apiClient.post('/grievances', payload);
    const g = response.data?.data || response.data;

    const createdDate = new Date().toISOString().split('T')[0];

    return {
      id: g.id || g.grievance_id || `GRV-${Date.now().toString().slice(-6)}`,
      subject: g.subject || payload.subject,
      category: g.category || payload.category,
      schemeName: grievancePayload.schemeName || 'Government Scheme',
      description: g.description || payload.description,
      submittedDate: createdDate,
      status: 'Submitted',
      assignedAuthority: 'SevaSetu Grievance Nodal Cell',
      attachmentName: grievancePayload.attachmentName || null,
      timeline: [
        { step: 'Grievance Registered', date: createdDate, completed: true },
        { step: 'Assigned to Nodal Officer', date: 'Underway', completed: false }
      ]
    };
  },

  updateGrievance: async (grievanceId, updatePayload) => {
    const response = await apiClient.patch(`/grievances/${grievanceId}`, updatePayload);
    return response.data?.data || response.data;
  }
};

export default grievanceService;
