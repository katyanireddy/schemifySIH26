// TEMPORARY MOCK IMPLEMENTATION
// Replace with real backend API after backend contract is finalized.

import initialMockReminders from '../data/mockReminders';

let inMemoryReminders = [...initialMockReminders];

export const reminderService = {
  getReminders: async () => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      setTimeout(() => resolve([...inMemoryReminders]), 100);
    });
  },

  createReminder: async (reminderPayload) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      const now = new Date();
      const due = new Date(reminderPayload.dueDate || '2026-12-31');
      const diffDays = Math.max(0, Math.ceil((due.getTime() - now.getTime()) / (1000 * 3600 * 24)));

      const newReminder = {
        id: `rem-${Date.now()}`,
        title: reminderPayload.title || 'New Citizen Reminder',
        category: reminderPayload.category || 'General Reminder',
        dueDate: reminderPayload.dueDate || '2026-12-31',
        urgency: reminderPayload.urgency || (diffDays <= 7 ? 'High' : 'Medium'),
        daysRemaining: diffDays,
        relatedType: reminderPayload.relatedType || 'General',
        relatedId: reminderPayload.relatedId || null,
        relatedLink: reminderPayload.relatedLink || '/opportunities',
        notes: reminderPayload.notes || ''
      };
      inMemoryReminders = [newReminder, ...inMemoryReminders];
      setTimeout(() => resolve(newReminder), 120);
    });
  },

  deleteReminder: async (reminderId) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      inMemoryReminders = inMemoryReminders.filter((r) => r.id !== reminderId);
      setTimeout(() => resolve({ success: true, id: reminderId }), 100);
    });
  }
};

export default reminderService;
