'use client';

import * as React from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
    Mail,
    Calendar,
    Phone,
    User,
    Trash2,
    CheckCircle2,
    Clock,
    MessageSquare,
    Search,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    status: 'new' | 'read' | 'archived';
    createdAt: any;
};

export default function AdminMessagesPage() {
    const [messages, setMessages] = React.useState<ContactMessage[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filter, setFilter] = React.useState<'all' | 'new' | 'read'>('all');

    React.useEffect(() => {
        const q = query(collection(db, 'contact_submissions'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: ContactMessage[] = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                msgs.push({
                    id: doc.id,
                    ...data,
                    status: data.status || 'new'
                } as ContactMessage);
            });
            setMessages(msgs);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const markAsRead = async (id: string, currentStatus: string) => {
        if (currentStatus === 'read') return;
        try {
            await updateDoc(doc(db, 'contact_submissions', id), {
                status: 'read'
            });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            await deleteDoc(doc(db, 'contact_submissions', id));
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    const filteredMessages = messages.filter(msg => {
        const matchesSearch =
            msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.service.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' || msg.status === filter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
                    <p className="text-slate-400">View and manage contact form submissions</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e: any) => setFilter(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Messages</option>
                        <option value="new">New</option>
                        <option value="read">Read</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-400">Loading messages...</div>
            ) : filteredMessages.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No messages found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredMessages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`group relative bg-slate-900 border rounded-xl p-6 transition-all ${msg.status === 'new'
                                    ? 'border-blue-500/50 shadow-sm shadow-blue-500/10'
                                    : 'border-slate-800 opacity-90'
                                    }`}
                                onClick={() => markAsRead(msg.id, msg.status)}
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${msg.status === 'new'
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : 'bg-slate-800 text-slate-500'
                                            }`}>
                                            {msg.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className={`text-lg font-bold ${msg.status === 'new' ? 'text-white' : 'text-slate-300'}`}>
                                                    {msg.name}
                                                </h3>
                                                {msg.status === 'new' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                                                        New
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400 mb-4">
                                                <span className="flex items-center gap-1.5">
                                                    <Mail className="w-4 h-4" />
                                                    {msg.email}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Phone className="w-4 h-4" />
                                                    {msg.phone}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4" />
                                                    {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : 'Just now'}
                                                </span>
                                            </div>

                                            <div className="bg-slate-950/50 rounded-lg p-4 text-slate-300 leading-relaxed border border-slate-800">
                                                <div className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider">
                                                    Subject: {msg.service}
                                                </div>
                                                {msg.message}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete Message"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
