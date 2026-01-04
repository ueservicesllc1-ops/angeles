'use client';

import * as React from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

export default function StaffDashboard() {
    const { user } = useAuth();
    const [assignedCount, setAssignedCount] = React.useState(0);

    React.useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'cases'), where('assignedStaffId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snap) => setAssignedCount(snap.size));
        return () => unsubscribe();
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Staff Dashboard</h1>
                <p className="mt-2 text-sm text-slate-400">Your assigned cases and workload</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8">
                <div className="bg-slate-900 overflow-hidden shadow-sm rounded-xl border border-slate-800">
                    <div className="px-6 py-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/10">
                                    <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-slate-400 truncate">Assigned Cases</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-bold text-white">{assignedCount}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 shadow-sm rounded-xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Your Workload</h2>
                <p className="text-sm text-slate-400">Case management features are being rebuilt.</p>
            </div>
        </div>
    );
}
