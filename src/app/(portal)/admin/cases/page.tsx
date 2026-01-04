'use client';

import * as React from 'react';
import Link from 'next/link';
import { collection, query, orderBy, onSnapshot, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TaxCase, UserProfile } from '@/types';
import {
    Briefcase,
    Calendar,
    CheckCircle2,
    Clock,
    AlertCircle,
    User,
    Users,
    X,
    Filter,
    ChevronRight,
    Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCasesPage() {
    const [cases, setCases] = React.useState<TaxCase[]>([]);
    const [staffList, setStaffList] = React.useState<UserProfile[]>([]);
    const [loading, setLoading] = React.useState(true);

    // Assignment Dialog State
    const [openAssignDialog, setOpenAssignDialog] = React.useState(false);
    const [selectedCaseId, setSelectedCaseId] = React.useState<string | null>(null);

    React.useEffect(() => {
        // Fetch Cases
        const casesQuery = query(collection(db, 'cases'), orderBy('createdAt', 'desc'));
        const unsubscribeCases = onSnapshot(casesQuery, (snapshot) => {
            const fetchedCases: TaxCase[] = [];
            snapshot.forEach((doc) => {
                fetchedCases.push({ id: doc.id, ...doc.data() } as TaxCase);
            });
            setCases(fetchedCases);
            setLoading(false);
        });

        // Fetch Staff
        const staffQuery = query(collection(db, 'users'), where('role', '==', 'staff'));
        const unsubscribeStaff = onSnapshot(staffQuery, (snapshot) => {
            const fetchedStaff: UserProfile[] = [];
            snapshot.forEach((doc) => {
                fetchedStaff.push(doc.data() as UserProfile);
            });
            setStaffList(fetchedStaff);
        });

        return () => {
            unsubscribeCases();
            unsubscribeStaff();
        };
    }, []);

    const handleAssignClick = (caseId: string) => {
        setSelectedCaseId(caseId);
        setOpenAssignDialog(true);
    };

    const handleConfirmAssign = async (staffMember: UserProfile) => {
        if (!selectedCaseId) return;

        try {
            const caseRef = doc(db, 'cases', selectedCaseId);
            await updateDoc(caseRef, {
                assignedStaffId: staffMember.uid,
                assignedStaffName: staffMember.displayName
            });
            setOpenAssignDialog(false);
            setSelectedCaseId(null);
        } catch (error) {
            console.error("Error assigning staff:", error);
            alert("Failed to assign staff.");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'submitted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'in_progress': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'action_required': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'submitted': return Clock;
            case 'in_progress': return Briefcase;
            case 'action_required': return AlertCircle;
            case 'completed': return CheckCircle2;
            default: return Clock;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Case Management</h1>
                    <p className="text-slate-400">Oversee and manage client tax cases</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-400">Loading cases...</div>
            ) : cases.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No active cases found in the system.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cases.map((taxCase) => {
                        const StatusIcon = getStatusIcon(taxCase.status);
                        return (
                            <motion.div
                                key={taxCase.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(taxCase.status)}`}>
                                        <StatusIcon className="w-3.5 h-3.5" />
                                        <span className="capitalize">{taxCase.status.replace('_', ' ')}</span>
                                    </div>
                                    <span className="text-xs text-slate-500 font-mono">
                                        ID: {taxCase.id.slice(0, 8)}...
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-1 truncate">
                                    {taxCase.serviceType.replace('_', ' ').toUpperCase()}
                                </h3>
                                <p className="text-sm text-slate-400 mb-4 flex items-center gap-2">
                                    <User className="w-4 h-4 text-slate-500" />
                                    {taxCase.userName || taxCase.userEmail || 'Unknown Client'}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between text-sm py-2 border-t border-slate-800/50">
                                        <span className="text-slate-500">Tax Year</span>
                                        <span className="text-slate-300 font-medium">{taxCase.taxYear}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm py-2 border-t border-slate-800/50">
                                        <span className="text-slate-500">Assigned To</span>
                                        {taxCase.assignedStaffName ? (
                                            <span className="text-blue-400 font-medium flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                {taxCase.assignedStaffName}
                                            </span>
                                        ) : (
                                            <span className="text-slate-500 italic">Unassigned</span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between text-sm py-2 border-t border-b border-slate-800/50">
                                        <span className="text-slate-500">Submitted</span>
                                        <span className="text-slate-300">
                                            {taxCase.createdAt?.toDate ? taxCase.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href={`/admin/cases/${taxCase.id}`}
                                        className="inline-flex items-center justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleAssignClick(taxCase.id)}
                                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg text-sm font-medium hover:bg-blue-600/20 transition-colors"
                                    >
                                        <Users className="w-4 h-4 mr-2" />
                                        {taxCase.assignedStaffId ? 'Reassign' : 'Assign'}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Custom Modal for Assign Staff */}
            <AnimatePresence>
                {openAssignDialog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setOpenAssignDialog(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-6 border-b border-slate-800">
                                <h2 className="text-xl font-bold text-white">Assign Staff Member</h2>
                                <button
                                    onClick={() => setOpenAssignDialog(false)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                                {staffList.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500">
                                        No staff members found.
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {staffList.map((staff) => (
                                            <button
                                                key={staff.uid}
                                                onClick={() => handleConfirmAssign(staff)}
                                                className="w-full flex items-center gap-3 p-3 text-left rounded-xl hover:bg-slate-800 transition-colors group"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    {staff.displayName?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <div className="text-slate-200 font-medium group-hover:text-white">{staff.displayName}</div>
                                                    <div className="text-sm text-slate-500">{staff.email}</div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-blue-400" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
                                <button
                                    onClick={() => setOpenAssignDialog(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
