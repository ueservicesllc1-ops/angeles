'use client';

import { ShieldAlert } from 'lucide-react';

export default function AdminAuditPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Audit Logs</h1>
                    <p className="text-slate-400">Track system security and user activity events</p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
                <ShieldAlert className="w-12 h-12 mx-auto mb-4 opacity-50 text-blue-400" />
                <p className="text-lg font-medium text-white mb-2">Audit System Logging</p>
                <p>System audit logs and security events module is currently under development.</p>
            </div>
        </div>
    );
}
