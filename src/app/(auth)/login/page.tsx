'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/client/dashboard');
        } catch (err: any) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/client/dashboard');
        } catch (err: any) {
            setError('Could not sign in with Google. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-950 font-sans selection:bg-blue-500/30">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900/60 to-slate-950/90"></div>

                <div className="relative z-10 max-w-lg px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
                            <Shield className="w-4 h-4" />
                            Secure Client Portal
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                            Manage Your Finances <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">With Confidence</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Access your tax documents, track your bookkeeping, and communicate with your financial team in one secure location.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        {['Bank-Level Security', 'Real-Time Updates', '24/7 Access'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-8 bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl"
                >
                    <div className="text-center">
                        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                            <div className="p-2 rounded-xl bg-blue-600/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Shield className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold text-white">ANGELES GROUP</span>
                        </Link>
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-slate-400">Please enter your details to sign in.</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-center"
                            >
                                <p className="text-sm text-red-400">{error}</p>
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-950/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500/20 focus:ring-offset-0"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-slate-400">
                                    Remember me
                                </label>
                            </div>
                            <Link href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-slate-900 text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign in with Google
                        </button>

                        <p className="text-center text-sm text-slate-400">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                Apply for access
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
