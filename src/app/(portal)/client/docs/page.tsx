'use client';

export default function ClientDocsPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Documents</h1>
                <p className="mt-2 text-sm text-slate-400">Upload and manage your tax documents</p>
            </div>

            <div className="bg-slate-900 shadow-sm rounded-xl border border-slate-800 p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <h3 className="mt-4 text-sm font-medium text-white">Document Management</h3>
                <p className="mt-1 text-sm text-slate-400">This feature is being rebuilt. Please check back soon.</p>
            </div>
        </div>
    );
}
