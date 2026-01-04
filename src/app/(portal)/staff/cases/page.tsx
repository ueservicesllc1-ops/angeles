'use client';

import * as React from 'react';
import Link from 'next/link';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TaxCase } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, Clock, User, ArrowRight } from 'lucide-react';

export default function StaffCasesPage() {
    const { user } = useAuth();
    const [cases, setCases] = React.useState<TaxCase[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!user) return;

        // Query cases where assignedStaffId == user.uid
        const q = query(
            collection(db, 'cases'),
            where('assignedStaffId', '==', user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedCases: TaxCase[] = [];
            snapshot.forEach((doc) => {
                fetchedCases.push({ id: doc.id, ...doc.data() } as TaxCase);
            });
            setCases(fetchedCases);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching cases:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { bg: string; text: string }> = {
            submitted: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
            in_progress: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
            action_required: { bg: 'bg-red-500/10', text: 'text-red-400' },
            completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
        };
        return statusMap[status] || { bg: 'bg-slate-700', text: 'text-slate-300' };
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Case Queue</h1>
                    <p className="text-slate-400">Manage your assigned cases</p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                {loading ? (
                    <div className="text-center py-12 text-slate-400">Loading cases...</div>
                ) : cases.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No cases assigned to you yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-950/50 text-slate-400 font-medium border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Service</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {cases.map((taxCase) => {
                                    const { bg, text } = getStatusBadge(taxCase.status);
                                    return (
                                        <tr key={taxCase.id} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-bold">
                                                        {taxCase.userName?.charAt(0).toUpperCase() || 'C'}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white">
                                                            {taxCase.userName || 'Unknown Client'}
                                                        </div>
                                                        <div className="text-xs text-slate-400">
                                                            {taxCase.userEmail}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-white">
                                                {taxCase.serviceType?.replace('_', ' ').toUpperCase() || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${bg} ${text} border-opacity-20`}>
                                                    {taxCase.status?.replace('_', ' ') || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {taxCase.createdAt?.toDate ? taxCase.createdAt.toDate().toLocaleDateString() : 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/staff/cases/${taxCase.id}`}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
                                                >
                                                    View Details
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
