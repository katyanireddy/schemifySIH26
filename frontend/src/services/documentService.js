// TEMPORARY MOCK IMPLEMENTATION
// Replace with real backend API after backend contract is finalized.

import initialMockDocuments from '../data/mockDocuments';

let inMemoryDocuments = [...initialMockDocuments];

export const documentService = {
  getDocuments: async () => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      setTimeout(() => resolve([...inMemoryDocuments]), 100);
    });
  },

  uploadDocument: async (docPayload) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        title: docPayload.title || 'Uploaded Document',
        type: docPayload.type || 'General',
        status: 'Pending Verification',
        uploadDate: new Date().toISOString().split('T')[0],
        expiryDate: docPayload.expiryDate || '2027-12-31',
        fileSize: docPayload.fileSize || '1.2 MB',
        fileType: docPayload.fileType || 'PDF',
        health: 'Good',
        verifiedBy: 'Verification Nodal Portal'
      };
      inMemoryDocuments = [newDoc, ...inMemoryDocuments];
      setTimeout(() => resolve(newDoc), 150);
    });
  },

  deleteDocument: async (documentId) => {
    // TEMPORARY MOCK IMPLEMENTATION
    return new Promise((resolve) => {
      inMemoryDocuments = inMemoryDocuments.filter((d) => d.id !== documentId);
      setTimeout(() => resolve({ success: true, id: documentId }), 100);
    });
  },

  getDocumentHealth: async () => {
    // TEMPORARY MOCK IMPLEMENTATION
    const docs = await documentService.getDocuments();
    const good = docs.filter((d) => d.health === 'Good').length;
    const expiringSoon = docs.filter((d) => d.health === 'Expiring Soon').length;
    const expired = docs.filter((d) => d.health === 'Expired').length;
    const total = docs.length;

    return {
      good,
      expiringSoon,
      expired,
      total,
      healthPercentage: total > 0 ? Math.round((good / total) * 100) : 0
    };
  }
};

export default documentService;
