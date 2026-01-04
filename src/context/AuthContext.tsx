'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserProfile, UserRole } from '@/types';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    logout: async () => { },
    refreshProfile: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const fetchUserProfile = async (uid: string, email?: string | null) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const data = userDoc.data() as UserProfile;
                // Auto-promote admin
                if (email === 'heavencoffee.us@gmail.com' && data.role !== 'admin') {
                    await updateDoc(userRef, { role: 'admin' });
                    data.role = 'admin';
                }
                setUserProfile(data);
            } else {
                // If doc doesn't exist but it's the admin email, create it as admin
                if (email === 'heavencoffee.us@gmail.com') {
                    const newAdmin: UserProfile = {
                        uid,
                        email: email || '',
                        displayName: 'Admin',
                        role: 'admin',
                        createdAt: serverTimestamp(),
                    };
                    await setDoc(userRef, newAdmin);
                    setUserProfile(newAdmin);
                } else {
                    console.error('User profile not found directly after login');
                    setUserProfile(null);
                }
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                await fetchUserProfile(currentUser.uid, currentUser.email);
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await firebaseSignOut(auth);
        setUser(null);
        setUserProfile(null);
        router.push('/login');
    };

    const refreshProfile = async () => {
        if (user) {
            await fetchUserProfile(user.uid);
        }
    }

    // Optional: Route protection based on roles could happen here or in middleware
    // For now, we'll let individual Layouts/Pages handle redirect if !user

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
