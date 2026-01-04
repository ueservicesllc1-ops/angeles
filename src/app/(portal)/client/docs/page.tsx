'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { TaxCase, CaseDocument } from '@/types';
import { Folder, Upload, Download, FileText, CheckCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

export default function ClientDocsPage() {
    const { user } = useAuth();
    const [cases, setCases] = React.useState<TaxCase[]>([]);
    const [caseDocuments, setCaseDocuments] = React.useState<Record<string, CaseDocument[]>>({});
    const [loading, setLoading] = React.useState(true);
    const [uploading, setUploading] = React.useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [expandedCase, setExpandedCase] = React.useState<string | null>(null);
    const fileInputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});

    // Fetch user's cases
    React.useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'cases'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedCases: TaxCase[] = [];
            snapshot.forEach((doc) => {
                fetchedCases.push({ id: doc.id, ...doc.data() } as TaxCase);
            });
            setCases(fetchedCases);
            setLoading(false);

            // Auto-expand first case if available
            if (fetchedCases.length > 0 && !expandedCase) {
                setExpandedCase(fetchedCases[0].id);
            }
        }, (error) => {
            console.error("Error fetching cases:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    // Fetch documents for all cases
    React.useEffect(() => {
        if (cases.length === 0) return;

        const unsubscribes = cases.map((taxCase) => {
            const docsQuery = query(
                collection(db, 'cases', taxCase.id, 'documents'),
                orderBy('createdAt', 'desc')
            );

            return onSnapshot(docsQuery, (snapshot) => {
                const docs: CaseDocument[] = [];
                snapshot.forEach((doc) => {
                    docs.push({ id: doc.id, ...doc.data() } as CaseDocument);
                });
                setCaseDocuments(prev => ({ ...prev, [taxCase.id]: docs }));
            });
        });

        return () => unsubscribes.forEach(unsub => unsub());
    }, [cases]);

    const handleFileUpload = async (caseId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(caseId);
        setUploadProgress(0);

        try {
            const storageRef = ref(storage, `cases/${caseId}/${Date.now()}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload failed:", error);
                    setUploading(null);
                    alert("Upload failed. Please try again.");
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    await addDoc(collection(db, 'cases', caseId, 'documents'), {
                        name: file.name,
                        url: downloadURL,
                        fileUrl: downloadURL,
                        fileName: file.name,
                        fileType: file.type,
                        type: file.type,
                        uploadedBy: 'client',
                        category: 'client_upload',
                        createdAt: serverTimestamp()
                    });

                    setUploading(null);
                    setUploadProgress(0);
                    if (fileInputRefs.current[caseId]) {
                        fileInputRefs.current[caseId]!.value = '';
                    }
                }
            );

        } catch (error) {
            console.error("Error uploading:", error);
            setUploading(null);
        }
    };

    const toggleCase = (caseId: string) => {
        setExpandedCase(expandedCase === caseId ? null : caseId);
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { bg: string; text: string }> = {
            submitted: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
            reviewing: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
            action_needed: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
            filing: { bg: 'bg-indigo-500/10', text: 'text-indigo-400' },
            completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
            rejected: { bg: 'bg-red-500/10', text: 'text-red-400' },
        };
        return statusMap[status] || { bg: 'bg-slate-700', text: 'text-slate-300' };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            </div>
        );
    }

    if (cases.length === 0) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
                    <p className="text-slate-400">Upload and manage your tax documents</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-slate-600 opacity-50" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Cases Yet</h3>
                    <p className="text-slate-400 mb-6">You need to create a case before you can upload documents.</p>
                    <a
                        href="/client/cases/new"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
                    >
                        Create Your First Case
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Documents</h1>
                <p className="text-slate-400">Upload and manage your tax documents by case</p>
            </div>

            <div className="space-y-4">
                {cases.map((taxCase) => {
                    const isExpanded = expandedCase === taxCase.id;
                    const docs = caseDocuments[taxCase.id] || [];
                    const { bg, text } = getStatusBadge(taxCase.status);
                    const isUploading = uploading === taxCase.id;

                    return (
                        <div key={taxCase.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                            {/* Case Header - Clickable */}
                            <button
                                onClick={() => toggleCase(taxCase.id)}
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <Folder className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-white">
                                            {taxCase.serviceType.replace('_', ' ').toUpperCase()} - {taxCase.taxYear}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${bg} ${text} border-opacity-20`}>
                                                {taxCase.status.replace('_', ' ')}
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                {docs.length} {docs.length === 1 ? 'document' : 'documents'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {isExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-slate-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                )}
                            </button>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="border-t border-slate-800 p-6 space-y-6">
                                    {/* Upload Section */}
                                    <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-medium text-white">Upload Document</h4>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => fileInputRefs.current[taxCase.id]?.click()}
                                                disabled={isUploading}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Upload className="w-4 h-4" />
                                                {isUploading ? 'Uploading...' : 'Choose File'}
                                            </button>
                                            <input
                                                type="file"
                                                hidden
                                                ref={(el) => { fileInputRefs.current[taxCase.id] = el; }}
                                                onChange={(e) => handleFileUpload(taxCase.id, e)}
                                            />
                                            {isUploading && (
                                                <div className="flex-1 max-w-xs">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                                                        <span className="text-xs text-slate-400">{Math.round(uploadProgress)}%</span>
                                                    </div>
                                                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                                                        <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Documents List */}
                                    {docs.length === 0 ? (
                                        <div className="text-center py-8 text-slate-400">
                                            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                            <p>No documents uploaded yet for this case.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-slate-300 mb-3">Documents ({docs.length})</h4>
                                            {docs.map((doc) => (
                                                <div
                                                    key={doc.id}
                                                    className={`flex items-center justify-between p-4 rounded-lg border ${doc.category === 'final_return'
                                                            ? 'bg-emerald-500/5 border-emerald-500/20 border-l-4 border-l-emerald-500'
                                                            : 'bg-slate-950/50 border-slate-800'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        {doc.category === 'final_return' ? (
                                                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                                        ) : (
                                                            <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-white font-medium text-sm truncate">
                                                                {doc.name || doc.fileName}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                                <span className="text-xs text-slate-400">
                                                                    Uploaded by: {doc.uploadedBy}
                                                                </span>
                                                                {doc.category === 'final_return' && (
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                                                        Final Return
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={doc.fileUrl || (doc as any).url}
                                                        download
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm flex-shrink-0 ml-4"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        Download
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
