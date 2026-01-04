'use client';

import * as React from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserProfile } from '@/types';
import {
    Users,
    Shield,
    ShieldCheck,
    User,
    Search,
    Filter,
    MoreVertical,
    Pencil
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminUsersPage() {
    const [users, setUsers] = React.useState<UserProfile[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedUsers: UserProfile[] = [];
            snapshot.forEach((doc) => {
                fetchedUsers.push(doc.data() as UserProfile);
            });
            setUsers(fetchedUsers);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching users:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const getRoleBadgeInfo = (role: string) => {
        switch (role) {
            case 'admin':
                return {
                    color: 'bg-red-500/10 text-red-500 border-red-500/20',
                    icon: ShieldCheck
                };
            case 'staff':
                return {
                    color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
                    icon: Shield
                };
            default:
                return {
                    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
                    icon: User
                };
        }
    };

    const formatDate = (date: any) => {
        if (!date) return 'N/A';
        if (date.toDate) return date.toDate().toLocaleDateString();
        if (date instanceof Date) return date.toLocaleDateString();
        return 'N/A';
    }

    const filteredUsers = users.filter(user =>
        (user.displayName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                    <p className="text-slate-400">Manage system access and user roles</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 placeholder:text-slate-500"
                    />
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950/50 text-slate-400 font-medium border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                        Loading users...
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => {
                                    const { color, icon: RoleIcon } = getRoleBadgeInfo(user.role);

                                    return (
                                        <tr key={user.uid} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                                                        {user.photoURL ? (
                                                            <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            (user.displayName?.charAt(0) || 'U').toUpperCase()
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white">
                                                            {user.displayName || 'Unnamed User'}
                                                        </div>
                                                        <div className="text-slate-400 text-xs">
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${color}`}>
                                                    <RoleIcon className="w-3.5 h-3.5" />
                                                    <span className="uppercase">{user.role}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400">
                                                {formatDate(user.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
