'use client';

import * as React from 'react';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
    Users,
    Briefcase,
    ShieldCheck,
    TrendingUp,
    Activity,
    Clock,
    ArrowRight,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = React.useState({
        totalCases: 0,
        totalUsers: 0,
        activeStaff: 0
    });
    const [recentCases, setRecentCases] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Stats
                const casesSnap = await getDocs(collection(db, 'cases'));
                const usersSnap = await getDocs(collection(db, 'users'));

                // Fetch Recent Cases
                const recentQuery = query(collection(db, 'cases'), orderBy('createdAt', 'desc'), limit(5));
                const recentSnap = await getDocs(recentQuery);
                const recent = recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setStats({
                    totalCases: casesSnap.size,
                    totalUsers: usersSnap.size,
                    activeStaff: usersSnap.docs.filter(d => d.data().role === 'staff').length
                });
                setRecentCases(recent);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="min-h-screen font-sans selection:bg-blue-500/30 space-y-8"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Dashboard
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Overview of agency performance.
                    </p>
                </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Cases"
                    value={stats.totalCases}
                    icon={Briefcase}
                    color="blue"
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    color="purple"
                />
                <StatCard
                    title="Active Staff"
                    value={stats.activeStaff}
                    icon={ShieldCheck}
                    color="emerald"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Cases */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Recent Cases</h2>
                        <Link href="/admin/cases" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1 group">
                            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-2">
                        {loading ? (
                            <div className="text-center py-12 text-slate-500">Loading data...</div>
                        ) : recentCases.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">No active cases found.</div>
                        ) : (
                            <div className="space-y-1">
                                {recentCases.map((item: any) => (
                                    <div key={item.id} className="group flex items-center justify-between p-4 hover:bg-slate-800/50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-700">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-lg">
                                                    {item.serviceType?.replace('_', ' ').toUpperCase() || 'SERVICE'}
                                                </h3>
                                                <p className="text-slate-400 text-sm">
                                                    {item.userName || item.userEmail || 'Client'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold tracking-wide uppercase mb-1 ${item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                                    item.status === 'action_required' ? 'bg-amber-500/10 text-amber-400' :
                                                        'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                {item.status?.replace('_', ' ') || 'New'}
                                            </div>
                                            <p className="text-slate-500 text-xs flex items-center justify-end gap-1">
                                                <Clock className="w-3 h-3" />
                                                {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Today'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions & Status */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/staff" className="group relative p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-blue-500/30 transition-all overflow-hidden text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ShieldCheck className="w-8 h-8 mx-auto text-blue-500 mb-3" />
                            <span className="text-white font-bold block">Add Staff</span>
                        </Link>
                        <Link href="/admin/users" className="group relative p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-purple-500/30 transition-all overflow-hidden text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Users className="w-8 h-8 mx-auto text-purple-500 mb-3" />
                            <span className="text-white font-bold block">Manage Users</span>
                        </Link>
                    </div>

                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-500" />
                            System Status
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">Database</span>
                                <span className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    OPERATIONAL
                                </span>
                            </div>
                            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="w-full h-full bg-emerald-500/20" />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-slate-400">Storage</span>
                                <span className="text-blue-400 font-bold text-sm">
                                    OPTIMIZED
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StatCard({ title, value, icon: Icon, color }: any) {
    const colors = {
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40",
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/40",
        emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40",
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
            }}
            className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-8 transition-colors hover:border-slate-700"
        >
            <div className={`absolute top-8 right-8 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${colors[color as keyof typeof colors].split(' ').slice(1).join(' ')}`}>
                <Icon className={`w-6 h-6 ${colors[color as keyof typeof colors].split(' ')[0]}`} />
            </div>

            <div className="relative z-10">
                <h3 className="text-4xl font-bold text-white mb-2">{value}</h3>
                <p className="text-slate-400 text-lg font-medium">{title}</p>
            </div>
        </motion.div>
    );
}
