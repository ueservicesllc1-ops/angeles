'use client';

import * as React from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { TaxCase } from '@/types';
import Link from 'next/link';

export default function ClientDashboard() {
    const { user } = useAuth();
    const [myCases, setMyCases] = React.useState<TaxCase[]>([]);

    React.useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'cases'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const cases: TaxCase[] = [];
            snapshot.forEach((doc) => {
                cases.push({ id: doc.id, ...doc.data() } as TaxCase);
            });
            setMyCases(cases);
        });

        return () => unsubscribe();
    }, [user]);

    const activeCases = myCases.filter(c => c.status !== 'completed');

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                        <p className="mt-2 text-sm text-slate-400">Manage your tax filings and track progress</p>
                    </div>
                    <Link
                        href="/client/cases/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg shadow-sm !text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Filing
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                <div className="bg-slate-900 overflow-hidden shadow-sm rounded-xl border border-slate-800">
                    <div className="px-6 py-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/10">
                                    <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-slate-400 truncate">Active Cases</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-bold text-white">{activeCases.length}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 overflow-hidden shadow-sm rounded-xl border border-slate-800">
                    <div className="px-6 py-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/10">
                                    <svg className="h-6 w-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-slate-400 truncate">Completed</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-bold text-white">{myCases.filter(c => c.status === 'completed').length}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 overflow-hidden shadow-sm rounded-xl border border-slate-800">
                    <div className="px-6 py-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500/10">
                                    <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-slate-400 truncate">Total Filings</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-bold text-white">{myCases.length}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Cases List */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Active Filings</h2>

                {activeCases.length === 0 ? (
                    <div className="bg-slate-900 shadow-sm rounded-xl border border-slate-800 p-12 text-center">
                        <svg className="mx-auto h-12 w-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-4 text-sm font-medium text-white">No active filings</h3>
                        <p className="mt-1 text-sm text-slate-400">Get started by creating a new filing.</p>
                        <div className="mt-6">
                            <Link
                                href="/client/cases/new"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg !text-white bg-blue-600 hover:bg-blue-500 transition shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                New Filing
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-slate-900 shadow-sm rounded-xl border border-slate-800 divide-y divide-slate-800">
                        {activeCases.map((taxCase) => (
                            <div key={taxCase.id} className="p-6 hover:bg-slate-800/50 transition">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="text-base font-semibold text-white">
                                                {taxCase.serviceType.replace('_', ' ').toUpperCase()}
                                            </h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${taxCase.status === 'reviewing' ? 'bg-blue-500/10 text-blue-400' :
                                                taxCase.status === 'action_needed' ? 'bg-amber-500/10 text-amber-400' :
                                                    taxCase.status === 'filing' ? 'bg-purple-500/10 text-purple-400' :
                                                        'bg-slate-700 text-slate-300'
                                                }`}>
                                                {taxCase.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-400">
                                            Tax Year: {taxCase.taxYear} • Created {taxCase.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                                        </p>
                                    </div>
                                    <div className="ml-6 flex-shrink-0">
                                        <Link
                                            href={`/client/cases/${taxCase.id}`}
                                            className="inline-flex items-center px-4 py-2 border border-slate-700 shadow-sm text-sm font-medium rounded-lg !text-white bg-slate-800 hover:bg-slate-700 transition"
                                        >
                                            View Details
                                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
