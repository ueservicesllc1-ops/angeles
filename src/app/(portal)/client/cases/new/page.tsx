'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CaseStatus, ServiceType } from '@/types';
import { Loader2 } from 'lucide-react';

const SERVICE_TYPES: { value: ServiceType; label: string }[] = [
    { value: 'individual_tax', label: 'Individual Tax Return (1040)' },
    { value: 'self_employed', label: 'Self-Employed / Contractor (1099)' },
    { value: 'business_tax', label: 'Business Tax Return (LLC/Corp)' },
    { value: 'itin', label: 'ITIN Application / Renewal' },
    { value: 'bookkeeping', label: 'Bookkeeping Services' },
    { value: 'incorporation', label: 'New Business Incorporation' },
    { value: 'amended_return', label: 'Amended Return' },
];

export default function NewCasePage() {
    const { user, userProfile } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        serviceType: 'individual_tax' as ServiceType,
        taxYear: new Date().getFullYear().toString(),
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !userProfile) return;

        setLoading(true);
        try {
            await addDoc(collection(db, 'cases'), {
                userId: user.uid,
                userEmail: user.email,
                userName: userProfile.displayName,
                serviceType: formData.serviceType,
                taxYear: formData.taxYear,
                notes: formData.notes,
                status: 'submitted' as CaseStatus,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            router.push('/client/cases');
        } catch (error) {
            console.error("Error creating case:", error);
            alert("Failed to create case. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Start New Case</h1>
                <p className="text-slate-400">Submit your information to begin working with our team</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Service Type <span className="text-red-400">*</span>
                        </label>
                        <select
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as ServiceType })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            {SERVICE_TYPES.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Tax Year / Period <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.taxYear}
                            onChange={(e) => setFormData({ ...formData, taxYear: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
                            placeholder="e.g., 2023, 2024, or 'Monthly'"
                            required
                        />
                        <p className="mt-1.5 text-xs text-slate-500">E.g., 2023, 2024, or 'Monthly'</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Additional Notes
                        </label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600 resize-none"
                            placeholder="Please describe any specific details about your situation..."
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading ? 'Creating Case...' : 'Submit Case'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
