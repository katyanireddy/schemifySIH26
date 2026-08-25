import apiClient from './apiClient';
import { getCurrentUserId } from './userService';

export const reminderService = {
  getReminders: async () => {
    const userId = getCurrentUserId();
    const response = await apiClient.get(`/reminders/user/${userId}`);
    const resData = response.data?.data || response.data || [];
    const rawReminders = Array.isArray(resData) ? resData : [];

    const now = new Date();

    return rawReminders.map((rem) => {
      const dueStr = rem.reminder_at ? rem.reminder_at.split('T')[0] : '2026-12-31';
      const due = new Date(dueStr);
      const diffDays = Math.max(0, Math.ceil((due.getTime() - now.getTime()) / (1000 * 3600 * 24)));

      const opp = rem.opportunity || {};

      return {
        id: rem.id || rem.reminder_id,
        opportunityId: rem.opportunity_id,
        title: rem.message || opp.name || 'Citizen Reminder',
        category: rem.reminder_type || 'Deadline Alert',
        dueDate: dueStr,
        urgency: diffDays <= 7 ? 'High' : 'Medium',
        daysRemaining: diffDays,
        status: rem.status || 'pending',
        relatedType: rem.reminder_type || 'Opportunity',
        relatedId: rem.opportunity_id,
        relatedLink: rem.opportunity_id ? `/opportunities` : '/documents',
        notes: rem.message || ''
      };
    });
  },

  createReminder: async (reminderPayload) => {
    const userId = getCurrentUserId();

    let reminderAt = reminderPayload.dueDate ? `${reminderPayload.dueDate}T09:00:00+05:30` : new Date(Date.now() + 7 * 86400000).toISOString();

    const payload = {
      user_id: userId,
      opportunity_id: reminderPayload.opportunityId || reminderPayload.relatedId || null,
      reminder_type: reminderPayload.category || reminderPayload.reminder_type || 'deadline',
      reminder_at: reminderAt,
      message: reminderPayload.title || reminderPayload.message || 'Scholarship deadline is approaching'
    };

    const response = await apiClient.post('/reminders', payload);
    const rem = response.data?.data || response.data;

    return {
      id: rem.id || rem.reminder_id,
      opportunityId: rem.opportunity_id,
      title: rem.message || payload.message,
      category: rem.reminder_type || payload.reminder_type,
      dueDate: reminderPayload.dueDate || '2026-12-31',
      urgency: 'Medium',
      daysRemaining: 7,
      status: 'pending',
      relatedType: 'Opportunity',
      notes: rem.message
    };
  },

  updateReminder: async (reminderId, updatePayload) => {
    const response = await apiClient.patch(`/reminders/${reminderId}`, updatePayload);
    return response.data?.data || response.data;
  },

  deleteReminder: async (reminderId) => {
    const response = await apiClient.delete(`/reminders/${reminderId}`);
    return response.data || { success: true, id: reminderId };
  }
};

export default reminderService;
