'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { doc, onSnapshot, collection, addDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { TaxCase, CaseDocument } from '@/types';
import {
    ArrowLeft,
    UploadCloud,
    FileText,
    CheckCircle,
    Clock,
    AlertCircle,
    Download,
    ShieldCheck,
    Calendar,
    Briefcase
} from 'lucide-react';

const steps = ['submitted', 'reviewing', 'action_needed', 'filing', 'completed'];

export default function CaseDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const caseId = params.caseId as string;

    const [caseData, setCaseData] = React.useState<TaxCase | null>(null);
    const [documents, setDocuments] = React.useState<CaseDocument[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [uploading, setUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

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
                        fileUrl: downloadURL, // For compatibility
                        fileName: file.name,
                        fileType: file.type,
                        type: file.type,
                        uploadedBy: 'client',
                        category: 'client_upload',
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-slate-400">Loading case details...</div>
            </div>
        );
    }

    if (!caseData) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-white mb-4">Case not found</h2>
                <Link href="/client/cases" className="text-blue-400 hover:text-blue-300">
                    Return to My Cases
                </Link>
            </div>
        );
    }

    // Calculate active step index for visual timeline
    let activeStep = steps.indexOf(caseData.status);
    if (activeStep === -1) activeStep = 0;
    if (caseData.status === 'rejected') activeStep = 0;

    const clientDocs = documents.filter(d => d.category === 'client_upload' || !d.category);
    const staffDocs = documents.filter(d => d.category !== 'client_upload' && d.category);

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header & Back Button */}
            <div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Cases
                </button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-white tracking-tight">Case Details</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${caseData.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    caseData.status === 'action_needed' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                }`}>
                                {caseData.status.replace('_', ' ')}
                            </span>
                        </div>
                        <p className="text-slate-400 flex items-center gap-2">
                            <span className="font-semibold text-white">{caseData.serviceType.replace('_', ' ').toUpperCase()}</span>
                            <span>•</span>
                            <span>Tax Year: {caseData.taxYear}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Timeline Stepper */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 overflow-x-auto">
                <div className="flex justify-between min-w-[600px]">
                    {steps.map((label, index) => {
                        const isCompleted = index <= activeStep;
                        const isCurrent = index === activeStep;

                        return (
                            <div key={label} className="flex flex-col items-center relative flex-1">
                                {/* Connector Line (except for first item) */}
                                {index !== 0 && (
                                    <div className={`absolute top-4 right-[50%] w-full h-1 ${index <= activeStep ? 'bg-blue-600' : 'bg-slate-800'
                                        }`} />
                                )}

                                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 mb-3 bg-slate-900 ${isCompleted
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-slate-700 text-slate-700'
                                    }`}>
                                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-slate-700" />}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-white' : isCompleted ? 'text-blue-400' : 'text-slate-600'
                                    }`}>
                                    {label.replace('_', ' ')}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Documents */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Official Docs Section */}
                    <div className="bg-slate-900/50 border border-blue-900/30 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-400" />
                            Official Documents
                        </h3>

                        {staffDocs.length === 0 ? (
                            <div className="text-center py-8 bg-slate-900/50 rounded-2xl border border-slate-800/50 border-dashed">
                                <Clock className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-400 text-sm">No official documents released yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {staffDocs.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/30 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white text-sm">{doc.name || doc.fileName}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-slate-500">
                                                        {doc.createdAt?.toDate ? doc.createdAt.toDate().toLocaleDateString() : 'Recent'}
                                                    </span>
                                                    {doc.category === 'final_return' && (
                                                        <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                                            FINAL RETURN
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            href={(doc as any).fileUrl || (doc as any).url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Client Uploads Section */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <UploadCloud className="w-5 h-5 text-slate-400" />
                                My Uploads
                            </h3>
                            <div>
                                <input
                                    type="file"
                                    hidden
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading || caseData.status === 'completed'}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <UploadCloud className="w-4 h-4" />
                                    Upload File
                                </button>
                            </div>
                        </div>

                        {uploading && (
                            <div className="mb-6 bg-slate-800/50 rounded-xl p-4">
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-white font-medium">Uploading...</span>
                                    <span className="text-blue-400">{Math.round(uploadProgress)}%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className="bg-blue-500 h-full rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {clientDocs.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl hover:border-slate-700 transition-colors">
                                <UploadCloud className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                                <p className="text-slate-500 text-sm font-medium">No files uploaded yet</p>
                                <p className="text-slate-600 text-xs mt-1">Upload necessary documents here</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {clientDocs.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-white transition-colors">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-300 group-hover:text-white text-sm transition-colors">
                                                    {doc.name || doc.fileName}
                                                </p>
                                                <p className="text-xs text-slate-600 mt-1">
                                                    {doc.createdAt?.toDate ? doc.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={(doc as any).fileUrl || (doc as any).url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 text-slate-500 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <h3 className="text-lg font-bold text-white mb-6">Case Info</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl">
                                <Calendar className="w-5 h-5 text-slate-500 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Tax Year</p>
                                    <p className="text-white font-semibold">{caseData.taxYear}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl">
                                <Briefcase className="w-5 h-5 text-slate-500 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Service Type</p>
                                    <p className="text-white font-semibold">{caseData.serviceType.replace('_', ' ').toUpperCase()}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl">
                                <FileText className="w-5 h-5 text-slate-500 mt-0.5" />
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Notes</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {caseData.notes || 'No notes available.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
