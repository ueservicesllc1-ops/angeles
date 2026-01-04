'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, onSnapshot, collection, addDoc, query, orderBy, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { TaxCase, CaseDocument, CaseStatus } from '@/types';
import {
    ArrowLeft,
    UploadCloud,
    FileText,
    Download,
    User,
    Mail,
    Calendar, // Using Calendar as fallback for InsertDriveFile if needed or just FileText
    File,
    CheckCircle,
    Clock,
    AlertCircle,
    XCircle,
    Briefcase
} from 'lucide-react';

export default function AdminCaseDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const caseId = params.caseId as string;

    const [caseData, setCaseData] = React.useState<TaxCase | null>(null);
    const [documents, setDocuments] = React.useState<CaseDocument[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [uploading, setUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Status update state
    const [updatingStatus, setUpdatingStatus] = React.useState(false);

    React.useEffect(() => {
        if (!caseId) return;

        // Fetch Case Data
        const unsubscribeCase = onSnapshot(doc(db, 'cases', caseId), (doc) => {
            if (doc.exists()) {
                setCaseData({ id: doc.id, ...doc.data() } as TaxCase);
            } else {
                console.log("Case not found");
            }
            setLoading(false);
        });

        // Fetch Case Documents
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

        setUploading(true);
        setUploadProgress(0);

        try {
            // Create storage ref
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
                    // Upload complete
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // Add to Firestore
                    await addDoc(collection(db, 'cases', caseId, 'documents'), {
                        name: file.name,
                        url: downloadURL, // Note: Using 'url' to match component expectation
                        fileUrl: downloadURL,
                        fileName: file.name,
                        fileType: file.type,
                        type: file.type,
                        uploadedBy: 'admin',
                        category: 'admin_upload',
                        createdAt: serverTimestamp()
                    });

                    setUploading(false);
                    setUploadProgress(0);
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
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-slate-400 animate-pulse">Loading case details...</div>
            </div>
        );
    }

    if (!caseData) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-white mb-4">Case not found</h2>
                <button
                    onClick={() => router.back()}
                    className="text-blue-400 hover:text-blue-300"
                >
                    Return to Cases
                </button>
            </div>
        );
    }

    const statuses: CaseStatus[] = ['submitted', 'reviewing', 'action_needed', 'filing', 'completed', 'rejected'];

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header & Back Button */}
            <div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to List
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Case Management</h1>
                        <p className="text-slate-400">View and manage client case details.</p>
                    </div>
                    <div className="relative">
                        <select
                            value={caseData.status}
                            onChange={(e) => handleStatusChange(e.target.value as CaseStatus)}
                            disabled={updatingStatus}
                            className="appearance-none bg-slate-900 border border-slate-700 text-white py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-slate-600 transition-colors capitalize min-w-[200px]"
                        >
                            {statuses.map((option) => (
                                <option key={option} value={option}>
                                    {option.replace('_', ' ')}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                            <Briefcase className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Case Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Client Info Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-500" />
                            Client & Case Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 mb-1">Client Name</h3>
                                <div className="text-white font-medium flex items-center gap-2">
                                    {caseData.userName || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 mb-1">Client Email</h3>
                                <div className="text-white font-medium flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-slate-600" />
                                    {caseData.userEmail || 'N/A'}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 mb-1">Service Type</h3>
                                <div className="text-white font-medium capitalize">
                                    {caseData.serviceType.replace('_', ' ')}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-slate-500 mb-1">Tax Year</h3>
                                <div className="text-white font-medium flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-600" />
                                    {caseData.taxYear}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <h3 className="text-sm font-medium text-slate-500 mb-2">Client Notes</h3>
                                <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 text-slate-300">
                                    {caseData.notes || 'No notes provided by the client.'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Documents
                            </h2>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <UploadCloud className="w-4 h-4 mr-2" />
                                {uploading ? 'Uploading...' : 'Upload Admin Doc'}
                            </button>
                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                            />
                        </div>

                        {uploading && (
                            <div className="mb-6 bg-slate-800/50 rounded-xl p-4">
                                <div className="flex justify-between text-xs text-slate-400 mb-2">
                                    <span>Uploading...</span>
                                    <span>{Math.round(uploadProgress)}%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            {documents.length === 0 ? (
                                <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                                    <File className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                                    <p className="text-slate-500">No documents uploaded yet.</p>
                                </div>
                            ) : (
                                documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-slate-800 rounded-lg text-blue-400">
                                                <File className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">
                                                    {doc.name || doc.fileName}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Uploaded by {doc.uploadedBy} • {doc.createdAt?.toDate ? doc.createdAt.toDate().toLocaleDateString() : 'Unknown date'}
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={doc.fileUrl || (doc as any).url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar info */}
                <div className="space-y-6">
                    {/* Staff Assignment */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Staff Assignment</h3>
                        <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Assigned To</p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs ring-2 ring-indigo-500/10">
                                    {(caseData.assignedStaffName || 'U').charAt(0)}
                                </div>
                                <span className="text-white font-medium">
                                    {caseData.assignedStaffName || 'Unassigned'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Checklist Placeholder */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Action Checklist</h3>
                        <p className="text-slate-400 text-sm">
                            Manage the workflow of this case here.
                        </p>
                        {/* Future checklist items */}
                        <div className="mt-4 p-4 border border-dashed border-slate-700 rounded-xl text-center">
                            <p className="text-xs text-slate-600">No active tasks</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
