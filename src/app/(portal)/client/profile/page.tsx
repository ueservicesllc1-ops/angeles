'use client';

import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Phone, MapPin, Save, Loader2 } from 'lucide-react';

export default function ClientProfilePage() {
    const { userProfile } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
                <p className="mt-2 text-slate-400">Manage your personal information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-sm">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-3xl font-bold mx-auto mb-4 border-4 border-slate-800 shadow-sm">
                                {userProfile?.photoURL ? (
                                    <img src={userProfile.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    userProfile?.displayName?.charAt(0).toUpperCase() || <User className="w-10 h-10" />
                                )}
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">
                            {userProfile?.displayName || 'User'}
                        </h2>
                        <p className="text-sm text-slate-400 mb-4 flex items-center justify-center gap-1.5">
                            <Mail className="w-3 h-3" />
                            {userProfile?.email}
                        </p>

                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold capitalize border border-blue-500/20">
                            {userProfile?.role || 'Client'} Account
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="md:col-span-2">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">Edit Information</h3>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 w-5 h-5 pointer-events-none" />
                                        <input
                                            type="text"
                                            defaultValue={userProfile?.displayName || ''}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-slate-600"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 w-5 h-5 pointer-events-none" />
                                        <input
                                            type="tel"
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-slate-600"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 w-5 h-5 pointer-events-none" />
                                    <textarea
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none min-h-[100px] resize-none placeholder:text-slate-600"
                                        placeholder="123 Main St, City, State, Zip"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
