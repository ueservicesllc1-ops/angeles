'use client';

'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, Filter, FileText, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ClientCasesPage() {
    const [cases, setCases] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        // Auth Listener to get current user ID
        // Note: In a real app we might use a global auth context, but this works for localized fetching
        import('firebase/auth').then(({ getAuth, onAuthStateChanged }) => {
            const auth = getAuth();
            const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                if (!currentUser) {
                    setLoading(false);
                    return;
                }
            });
            return unsubscribeAuth;
        });
    }, []);

    React.useEffect(() => {
        if (!user) return;

        // Fetch Cases for the Logged-in User
        import('firebase/firestore').then(({ collection, query, where, onSnapshot, orderBy }) => {
            const { db } = require('@/lib/firebase');

            // Query: Cases where userId == current user's uid
            // Note: Requires index on userId + createdAt if ordering. 
            // For now, simpler query to avoid index errors immediately.
            const q = query(
                collection(db, 'cases'),
                where('userId', '==', user.uid)
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedCases = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // Fallback for converting Firestore timestamps safely
                    date: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleDateString() : 'Recent'
                }));
                // Sort client-side to avoid complex compound index requirements during dev
                fetchedCases.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

                setCases(fetchedCases);
                setLoading(false);
            }, (error) => {
                console.error("Error fetching cases:", error);
                setLoading(false);
            });

            return () => unsubscribe();
        });
    }, [user]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'processing':
            case 'reviewing':
            case 'filing': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'action_needed':
            case 'action_required': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
            case 'processing':
            case 'reviewing':
            case 'filing': return <Clock className="w-4 h-4 mr-1.5" />;
            case 'action_needed':
            case 'action_required': return <AlertCircle className="w-4 h-4 mr-1.5" />;
            default: return <Clock className="w-4 h-4 mr-1.5" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-slate-400 animate-pulse">Loading your cases...</div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">My Cases</h1>
                <p className="mt-2 text-slate-400">View and track the status of your ongoing and past services.</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search cases..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                </div>
                <button className="flex items-center px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                    <Filter className="w-5 h-5 mr-2" />
                    Filter
                </button>
            </div>

            {/* Cases List */}
            <div className="space-y-4">
                {cases.length === 0 ? (
                    <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
                        <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">No cases found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            You don't have any active tax cases yet. Contact your administrator to start a new case.
                        </p>
                    </div>
                ) : (
                    cases.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-slate-800/50 rounded-lg group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                                        <FileText className="w-6 h-6 text-slate-400 group-hover:text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                                                {item.serviceType?.replace('_', ' ').toUpperCase() || 'TAX SERVICE'}
                                            </h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                                                {getStatusIcon(item.status)}
                                                {item.status?.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="text-slate-300 text-sm mb-1">{item.description || item.notes || 'No description available.'}</p>
                                        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                                            <span>Tax Year: {item.taxYear || 'N/A'}</span>
                                            <span>•</span>
                                            <span>Created: {item.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end">
                                    <Link
                                        href={`/client/cases/${item.id}`}
                                        className="flex items-center text-sm font-bold text-white transition-all bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-600/40 hover:-translate-y-0.5"
                                    >
                                        View Details
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
