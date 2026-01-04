'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Download, FileText, CheckCircle, Clock, User, Mail } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { doc, onSnapshot, collection, addDoc, query, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { TaxCase, CaseDocument, CaseStatus } from '@/types';

export default function StaffCaseDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const caseId = params.caseId as string;

    const [caseData, setCaseData] = React.useState<TaxCase | null>(null);
    const [documents, setDocuments] = React.useState<CaseDocument[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [uploading, setUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [docCategory, setDocCategory] = React.useState('staff_upload');
    const [updatingStatus, setUpdatingStatus] = React.useState(false);

    React.useEffect(() => {
        if (!caseId) return;

        const unsubscribeCase = onSnapshot(doc(db, 'cases', caseId), (doc) => {
            if (doc.exists()) {
                setCaseData({ id: doc.id, ...doc.data() } as TaxCase);
            } else {
                console.log("Case not found");
            }
            setLoading(false);
        });

        const docsQuery = query(collection(db, 'cases', caseId, 'documents'), orderBy('createdAt', 'desc'));
        const unsubscribeDocs = onSnapshot(docsQuery, (snapshot) => {
            const docs: CaseDocument[] = [];
            snapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() } as CaseDocument);
            });
            setDocuments(docs);
        });

        return () => {
            unsubscribeCase();
            unsubscribeDocs();
        };
    }, [caseId]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (docCategory === 'final_return') {
            const confirm = window.confirm("You are uploading this as a FINAL RETURN document. The client will be notified. Proceed?");
            if (!confirm) {
                if (fileInputRef.current) fileInputRef.current.value = '';
                return;
            }
        }

        setUploading(true);
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
                    setUploading(false);
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
                        uploadedBy: 'staff',
                        category: docCategory,
                        createdAt: serverTimestamp()
                    });

                    setUploading(false);
                    setUploadProgress(0);
                    setDocCategory('staff_upload');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                }
            );

        } catch (error) {
            console.error("Error uploading:", error);
            setUploading(false);
        }
    };

    const handleStatusChange = async (newStatus: CaseStatus) => {
        if (!caseData) return;
        setUpdatingStatus(true);
        try {
            await updateDoc(doc(db, 'cases', caseId), {
                status: newStatus,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        } finally {
            setUpdatingStatus(false);
        }
    };

    if (loading) {
        return <div className="text-center py-12 text-slate-400">Loading case details...</div>;
    }

    if (!caseData) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-white mb-4">Case not found</h2>
                <button onClick={() => router.back()} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
                    Go Back
                </button>
            </div>
        );
    }

    const statuses: CaseStatus[] = ['submitted', 'reviewing', 'action_needed', 'filing', 'completed', 'rejected'];

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

    return (
        <div className="space-y-6">
            <button
                onClick={() => router.push('/staff/dashboard')}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-white">Working Case</h1>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-slate-400">Status:</label>
                    <select
                        value={caseData.status}
                        onChange={(e) => handleStatusChange(e.target.value as CaseStatus)}
                        disabled={updatingStatus}
                        className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {statuses.map((option) => (
                            <option key={option} value={option}>
                                {option.replace('_', ' ').toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Case Information */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-blue-400 mb-4">Client & Case Information</h2>
                        <div className="h-px bg-slate-800 mb-4"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-xs text-slate-500 mb-1">Client Name</div>
                                <div className="text-white font-medium flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-400" />
                                    {caseData.userName || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 mb-1">Client Email</div>
                                <div className="text-white font-medium flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    {caseData.userEmail || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 mb-1">Service Type</div>
                                <div className="text-white font-medium">
                                    {caseData.serviceType.replace('_', ' ').toUpperCase()}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 mb-1">Tax Year</div>
                                <div className="text-white font-medium">{caseData.taxYear}</div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="text-xs text-slate-500 mb-2">Client Notes</div>
                                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-slate-300 text-sm">
                                    {caseData.notes || 'No notes provided.'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-lg font-bold text-blue-400 mb-4">Case Documents</h2>

                        {/* Upload Controls */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-4 bg-slate-950/50 border border-slate-800 rounded-lg p-4">
                            <select
                                value={docCategory}
                                onChange={(e) => setDocCategory(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="staff_upload">General Staff Upload</option>
                                <option value="final_return">Final Tax Return</option>
                                <option value="supporting_doc">Supporting Document</option>
                            </select>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                <Upload className="w-4 h-4" />
                                Upload Document
                            </button>
                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                            />
                        </div>

                        <div className="h-px bg-slate-800 mb-4"></div>

                        {uploading && (
                            <div className="mb-4">
                                <div className="text-xs text-slate-400 mb-2">Uploading: {Math.round(uploadProgress)}%</div>
                                <div className="w-full bg-slate-800 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                            </div>
                        )}

                        {documents.length === 0 ? (
                            <div className="text-center py-8 text-slate-400">
                                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                No documents associated with this case.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className={`flex items-center justify-between p-4 rounded-lg border ${doc.category === 'final_return'
                                                ? 'bg-emerald-500/5 border-emerald-500/20 border-l-4 border-l-emerald-500'
                                                : doc.category === 'client_upload'
                                                    ? 'bg-slate-950/50 border-slate-800'
                                                    : 'bg-blue-500/5 border-blue-500/20'
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
                                                    {doc.category === 'client_upload' && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border border-slate-700 text-slate-400">
                                                            Client
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
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-3">My Assignment</h3>
                        <p className="text-sm text-slate-400">
                            Manage this case thoroughly. Ensure all final returns are marked correctly when uploading so the client sees them clearly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
