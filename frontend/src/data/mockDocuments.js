/**
 * Centralized Mock Data for Citizen Documents Vault
 * TEMPORARY MOCK IMPLEMENTATION — To be replaced when backend Supabase contracts are finalized.
 */
export const initialMockDocuments = [
  {
    id: 'doc-101',
    title: 'Income Certificate (2025–26)',
    type: 'Income Proof',
    status: 'Verified',
    uploadDate: '2026-01-15',
    expiryDate: '2027-01-15',
    fileSize: '1.4 MB',
    fileType: 'PDF',
    health: 'Good', // Good, Expiring Soon, Expired, Needs Reupload
    verifiedBy: 'Revenue Department, Bihar'
  },
  {
    id: 'doc-102',
    title: 'Aadhaar Card (UIDAI Verified)',
    type: 'Identity Proof',
    status: 'Verified',
    uploadDate: '2025-11-10',
    expiryDate: 'N/A',
    fileSize: '850 KB',
    fileType: 'PDF',
    health: 'Good',
    verifiedBy: 'UIDAI eKYC'
  },
  {
    id: 'doc-103',
    title: 'Class 12th Marksheet & Passing Cert',
    type: 'Educational Proof',
    status: 'Verified',
    uploadDate: '2025-12-01',
    expiryDate: 'N/A',
    fileSize: '2.1 MB',
    fileType: 'PDF',
    health: 'Good',
    verifiedBy: 'BSEB Board'
  },
  {
    id: 'doc-104',
    title: 'Domicile / Residence Certificate',
    type: 'Residence Proof',
    status: 'Pending Verification',
    uploadDate: '2026-08-20',
    expiryDate: '2029-08-20',
    fileSize: '1.1 MB',
    fileType: 'PDF',
    health: 'Expiring Soon',
    verifiedBy: 'Block Development Officer'
  },
  {
    id: 'doc-105',
    title: 'OBC Non-Creamy Layer Certificate',
    type: 'Category Certificate',
    status: 'Action Required',
    uploadDate: '2025-04-10',
    expiryDate: '2026-04-10',
    fileSize: '980 KB',
    fileType: 'PDF',
    health: 'Expired',
    verifiedBy: 'District Magistrate Office'
  }
];

export default initialMockDocuments;
