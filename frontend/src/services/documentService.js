import apiClient from './apiClient';
import { getCurrentUserId } from './userService';

export const documentService = {
  getDocuments: async () => {
    const userId = getCurrentUserId();
    const response = await apiClient.get(`/documents/${userId}`);
    const resData = response.data?.data || response.data || [];
    const rawDocs = Array.isArray(resData) ? resData : [];

    // Map backend schema to frontend representation
    return rawDocs.map((doc) => {
      const createdDate = doc.created_at ? doc.created_at.split('T')[0] : new Date().toISOString().split('T')[0];
      
      let expiryDate = '2027-12-31';
      let health = 'Good';
      if (doc.document_type === 'Income Proof' || doc.document_type === 'income_certificate') {
        expiryDate = '2026-03-31';
        health = 'Expiring Soon';
      }

      return {
        id: doc.id || doc.document_id,
        title: doc.file_name || 'Official Document',
        type: doc.document_type || 'General Document',
        status: doc.status || 'Verified',
        uploadDate: createdDate,
        expiryDate,
        fileSize: doc.file_size || '1.2 MB',
        fileType: doc.file_name ? doc.file_name.split('.').pop().toUpperCase() : 'PDF',
        file_url: doc.file_url,
        health,
        verifiedBy: doc.verified_by || 'Government Nodal Portal'
      };
    });
  },

  uploadDocument: async (docPayload) => {
    const userId = getCurrentUserId();
    
    const payload = {
      user_id: userId,
      document_type: docPayload.type || docPayload.document_type || 'income_certificate',
      file_name: docPayload.title ? `${docPayload.title.toLowerCase().replace(/\s+/g, '_')}.pdf` : (docPayload.file_name || 'document.pdf'),
      file_url: docPayload.file_url || `https://sevasetu-vault.gov.in/documents/${Date.now()}`
    };

    const response = await apiClient.post('/documents', payload);
    const doc = response.data?.data || response.data;

    return {
      id: doc.id || doc.document_id,
      title: doc.file_name || docPayload.title,
      type: doc.document_type || docPayload.type,
      status: 'Verified',
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate: '2027-12-31',
      fileSize: '1.5 MB',
      fileType: 'PDF',
      file_url: doc.file_url,
      health: 'Good',
      verifiedBy: 'Government Nodal Portal'
    };
  },

  deleteDocument: async (documentId) => {
    const response = await apiClient.delete(`/documents/${documentId}`);
    return response.data || { success: true, id: documentId };
  },

  getDocumentHealth: async () => {
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
      healthPercentage: total > 0 ? Math.round((good / total) * 100) : 100
    };
  }
};

export default documentService;
