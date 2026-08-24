import React, { useState, useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopNav from '../components/common/TopNav';
import documentService from '../services/documentService';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  ShieldCheck,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export const Documents = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [healthSummary, setHealthSummary] = useState({ good: 0, expiringSoon: 0, expired: 0, total: 0, healthPercentage: 100 });
  const [loading, setLoading] = useState(true);

  // Form State
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState('Income Proof');
  const [fileName, setFileName] = useState('');

  const loadDocuments = async () => {
    setLoading(true);
    const docs = await documentService.getDocuments();
    const health = await documentService.getDocumentHealth();
    setDocuments(docs);
    setHealthSummary(health);
    setLoading(false);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!docTitle) return;

    await documentService.uploadDocument({
      title: docTitle,
      type: docType,
      fileSize: '1.5 MB',
      fileType: fileName ? fileName.split('.').pop().toUpperCase() : 'PDF'
    });

    setDocTitle('');
    setFileName('');
    loadDocuments();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this document from your vault?')) {
      await documentService.deleteDocument(id);
      loadDocuments();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNav onMenuToggle={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1 max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              Citizen Documents Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Upload and manage your income certificates, Aadhaar, degree marksheets, and domicile proofs for 1-click scheme verification.
            </p>
          </div>

          {/* Document Vault Health Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vault Readiness</p>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{healthSummary.healthPercentage}%</p>
                <p className="text-[11px] text-slate-500">Document Health Score</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                <FileCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Vault Documents</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{healthSummary.total}</p>
                <p className="text-[11px] text-slate-500">Verified & Uploaded</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expiring Soon</p>
                <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{healthSummary.expiringSoon}</p>
                <p className="text-[11px] text-slate-500">Renewal Attention Required</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expired Docs</p>
                <p className="text-2xl font-black text-red-600 dark:text-red-400">{healthSummary.expired}</p>
                <p className="text-[11px] text-slate-500">Needs Fresh Upload</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>

          </div>

          {/* Attention Banner if expired/expiring docs exist */}
          {healthSummary.expired > 0 && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center gap-3 text-red-800 dark:text-red-300 text-xs font-medium">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>
                <strong>Attention Required:</strong> You have {healthSummary.expired} expired document(s). Update them to ensure seamless scholarship eligibility processing.
              </span>
            </div>
          )}

          {/* Upload New Document Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-brand-600" />
              Upload New Official Document
            </h2>

            <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Income Certificate 2026"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Document Category</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
                >
                  <option value="Income Proof">Income Proof (Certificate)</option>
                  <option value="Identity Proof">Identity Proof (Aadhaar/PAN)</option>
                  <option value="Residence Proof">Residence/Domicile Proof</option>
                  <option value="Educational Proof">Educational Marksheet/Degree</option>
                  <option value="Category Certificate">Category Certificate (OBC/SC/ST/EWS)</option>
                </select>
              </div>

              <div className="space-y-1 flex flex-col justify-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload & Verify</span>
                </button>
              </div>
            </form>
          </div>

          {/* Documents Grid */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Uploaded Documents ({documents.length})</h2>
            
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-500">Loading documents...</div>
            ) : documents.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-xs text-slate-500">
                No documents uploaded yet. Use the form above to add your first document.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 space-y-4 shadow-xs flex flex-col justify-between transition-all ${
                      doc.health === 'Expired'
                        ? 'border-red-200 dark:border-red-900/60'
                        : doc.health === 'Expiring Soon'
                        ? 'border-amber-200 dark:border-amber-900/60'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                          {doc.type}
                        </span>

                        {doc.status === 'Verified' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                            <Clock className="w-3.5 h-3.5" /> Pending
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{doc.title}</h3>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div>
                          <span className="block font-semibold text-slate-400">Uploaded:</span>
                          <span>{doc.uploadDate}</span>
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-400">Expires:</span>
                          <span className={doc.health === 'Expired' ? 'text-red-600 font-bold' : ''}>{doc.expiryDate}</span>
                        </div>
                      </div>

                      {doc.verifiedBy && (
                        <p className="text-[10px] text-slate-400 font-medium">
                          Verified by: <strong>{doc.verifiedBy}</strong>
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400 text-[11px]">{doc.fileSize || '1.0 MB'} • {doc.fileType || 'PDF'}</span>

                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        title="Delete Document"
                        aria-label="Delete document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
};

export default Documents;
