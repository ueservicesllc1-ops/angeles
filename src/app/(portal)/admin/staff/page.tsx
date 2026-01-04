'use client';

import * as React from 'react';
import { collection, query, onSnapshot, orderBy, setDoc, doc, serverTimestamp, where } from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, firebaseConfig } from '@/lib/firebase';
import { UserProfile } from '@/types';
import {
    Users,
    Shield,
    UserPlus,
    Pencil,
    X,
    Loader2,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminStaffPage() {
    const [staff, setStaff] = React.useState<UserProfile[]>([]);
    const [loading, setLoading] = React.useState(true);

    // Dialog State
    const [openDialog, setOpenDialog] = React.useState(false);
    const [creating, setCreating] = React.useState(false);
    const [newStaff, setNewStaff] = React.useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    React.useEffect(() => {
        // Query users where role == 'staff'
        const q = query(collection(db, 'users'), where('role', '==', 'staff'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedStaff: UserProfile[] = [];
            snapshot.forEach((doc) => {
                fetchedStaff.push(doc.data() as UserProfile);
            });
            // Client-side sort if needed since compound queries can be tricky without index
            fetchedStaff.sort((a, b) => {
                // @ts-ignore
                return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
            });
            setStaff(fetchedStaff);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching staff:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleCreateStaff = async () => {
        if (newStaff.password !== newStaff.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (newStaff.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        setCreating(true);
        let secondaryApp;
        try {
            // Initialize a secondary app to create user without taking over current auth session
            const appName = "SecondaryApp-" + Date.now();
            secondaryApp = initializeApp(firebaseConfig, appName);
            const secondaryAuth = getAuth(secondaryApp);

            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newStaff.email, newStaff.password);
            const uid = userCredential.user.uid;

            // Create Firestore Profile with 'staff' role
            await setDoc(doc(db, 'users', uid), {
                uid: uid,
                displayName: newStaff.displayName,
                email: newStaff.email,
                photoURL: '',
                role: 'staff',
                createdAt: serverTimestamp()
            });

            // Cleanup
            await signOut(secondaryAuth);

            setOpenDialog(false);
            setNewStaff({ displayName: '', email: '', password: '', confirmPassword: '' });
            alert("Staff member created successfully!");

        } catch (error: any) {
            console.error("Error creating staff:", error);
            if (error.code === 'auth/email-already-in-use') {
                alert("Error: This email address is already in use by another account.");
            } else {
                alert("Error creating staff: " + error.message);
            }
        } finally {
            setCreating(false);
            if (secondaryApp) await deleteApp(secondaryApp);
        }
    };

    const formatDate = (date: any) => {
        if (!date) return 'N/A';
        if (date.toDate) return date.toDate().toLocaleDateString();
        // Fallback if it's already a Date object or timestamp number
        if (date instanceof Date) return date.toLocaleDateString();
        return 'N/A';
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Staff Management</h1>
                    <p className="text-slate-400">Manage internal team members and permissions</p>
                </div>

                <button
                    onClick={() => setOpenDialog(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-sm shadow-blue-500/20"
                >
                    <UserPlus className="w-4 h-4" />
                    Add Staff Member
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950/50 text-slate-400 font-medium border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Staff Member</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        Loading staff members...
                                    </td>
                                </tr>
                            ) : staff.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        No staff members found.
                                    </td>
                                </tr>
                            ) : (
                                staff.map((user) => (
                                    <tr key={user.uid} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                                                    {user.photoURL ? (
                                                        <img src={user.photoURL} alt={user.displayName || 'Staff'} className="w-full h-full rounded-full object-cover" />
                                                    ) : (
                                                        (user.displayName?.charAt(0) || 'S').toUpperCase()
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-white">
                                                        {user.displayName || 'Unnamed Staff'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-500/10 text-amber-500 border-amber-500/20">
                                                <Shield className="w-3.5 h-3.5" />
                                                STAFF
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Staff Dialog using Custom Modal */}
            <AnimatePresence>
                {openDialog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setOpenDialog(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-6 border-b border-slate-800">
                                <h2 className="text-xl font-bold text-white">Add New Staff Member</h2>
                                <button
                                    onClick={() => setOpenDialog(false)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        value={newStaff.displayName}
                                        onChange={(e) => setNewStaff({ ...newStaff, displayName: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        value={newStaff.email}
                                        onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
                                        placeholder="jane@company.com"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                                        <input
                                            type="password"
                                            value={newStaff.password}
                                            onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
                                            placeholder="******"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={newStaff.confirmPassword}
                                            onChange={(e) => setNewStaff({ ...newStaff, confirmPassword: e.target.value })}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
                                            placeholder="******"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-800 flex justify-end gap-3">
                                <button
                                    onClick={() => setOpenDialog(false)}
                                    className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateStaff}
                                    disabled={creating || !newStaff.email || !newStaff.password}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                                >
                                    {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {creating ? 'Creating...' : 'Create Account'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
