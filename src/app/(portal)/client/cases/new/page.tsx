'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CaseStatus, ServiceType } from '@/types';

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
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, fontFamily: 'Playfair Display' }}>
                Start New Case
            </Typography>

            <Paper sx={{ p: 4, maxWidth: 800 }}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                select
                                fullWidth
                                label="Service Type"
                                value={formData.serviceType}
                                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as ServiceType })}
                            >
                                {SERVICE_TYPES.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Tax Year / Period"
                                value={formData.taxYear}
                                onChange={(e) => setFormData({ ...formData, taxYear: e.target.value })}
                                helperText="E.g., 2023, 2024, or 'Monthly'"
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Additional Notes"
                                placeholder="Please describe any specific details about your situation..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" onClick={() => router.back()}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating Case...' : 'Submit Case'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}
