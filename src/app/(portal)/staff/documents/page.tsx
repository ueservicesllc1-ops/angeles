'use client';

import * as React from 'react';
import Link from 'next/link';
import { Folder, ChevronRight, FileText } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { TaxCase } from '@/types';

export default function StaffDocumentsPage() {
    const { user } = useAuth();
    const [assignedCases, setAssignedCases] = React.useState<TaxCase[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'cases'),
            where('assignedStaffId', '==', user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedCases: TaxCase[] = [];
            snapshot.forEach((doc) => {
                fetchedCases.push({ id: doc.id, ...doc.data() } as TaxCase);
            });
            setAssignedCases(fetchedCases);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching cases for documents:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Client Documents</h1>
                <p className="text-slate-400">Select a case to view and manage its documents.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm max-w-3xl">
                {loading ? (
                    <div className="p-12 text-center text-slate-400">Loading cases...</div>
                ) : assignedCases.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-slate-600 opacity-50" />
                        <p className="text-slate-400">No active cases assigned to you.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {assignedCases.map((taxCase) => (
                            <Link
                                key={taxCase.id}
                                href={`/staff/cases/${taxCase.id}`}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-800/50 transition-colors group"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <Folder className="w-5 h-5 text-blue-400" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                        {taxCase.userName || taxCase.userEmail || 'Unknown Client'}
                                    </div>
                                    <div className="text-sm text-slate-400 mt-0.5">
                                        {taxCase.serviceType.replace('_', ' ').toUpperCase()} - {taxCase.taxYear}
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
