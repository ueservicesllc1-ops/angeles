'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const steps = [
    {
        num: '01',
        title: 'Contact Us',
        desc: 'Reach out via phone, WhatsApp, or our online form to tell us what you need support with.',
    },
    {
        num: '02',
        title: 'Schedule Appointment',
        desc: 'Book a time to meet in-person at our Hoschton office or arrange a virtual consultation.',
    },
    {
        num: '03',
        title: 'Submit Documents',
        desc: 'Bring or upload the required documents. We review everything to ensure nothing is missed.',
    },
    {
        num: '04',
        title: 'We Handle Everything',
        desc: 'Relax while we prepare your taxes or paperwork. We notify you when everything is ready for signature.',
    },
];

export default function HowItWorksPage() {
    return (
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="overline" color="secondary" sx={{ fontWeight: 700 }}>PROCESS</Typography>
                    <Typography variant="h2" sx={{ fontWeight: 700 }}>How It Works</Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
                        Simple, transparent, and efficient.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {steps.map((step) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.num}>
                            <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
                                <CardContent sx={{ pt: 4, textAlign: 'center' }}>
                                    <Typography variant="h1" sx={{ fontSize: '4rem', color: 'rgba(0,0,0,0.05)', position: 'absolute', top: -10, left: 10, fontWeight: 900 }}>
                                        {step.num}
                                    </Typography>
                                    <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 600 }}>
                                        {step.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {step.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Button variant="contained" color="secondary" size="large" href="/contact">
                        Get Started Now
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
