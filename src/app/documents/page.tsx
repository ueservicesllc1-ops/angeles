'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '@mui/material/Button';

const checklists = [
    {
        title: 'Personal Information',
        items: [
            'Social Security Number (SSN) or ITIN for you, spouse, and dependents',
            'Dates of birth for all persons listed on return',
            'Valid Driver’s License or Real ID / Passport',
            'Bank Account number and Routing number for Direct Deposit'
        ]
    },
    {
        title: 'Income Information',
        items: [
            'W-2 Forms from all employers',
            '1099-NEC for self-employed/contractor work',
            '1099-G for Unemployment benefits',
            '1099-R for Pension/Retirement/Annuity',
            'SSA-1099 for Social Security benefits',
            'Rental income and expenses records',
            'Interest and Dividend statements (1099-INT, 1099-DIV)'
        ]
    },
    {
        title: 'Deductions & Expenses',
        items: [
            'Form 1098 (Mortgage Interest)',
            'Property Tax records',
            'Charitable donation receipts',
            'Medical expense receipts',
            'Form 1098-T (Tuition statement)',
            'Child care provider information (Name, Address, EIN/SSN)',
            'Business expenses list (for self-employed)'
        ]
    }
];

export default function DocumentsPage() {
    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
                        Documents Required
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        Please bring these documents to your appointment to ensure an accurate and fast filing.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {checklists.map((category) => (
                        <Grid size={{ xs: 12, md: 4 }} key={category.title}>
                            <Paper elevation={2} sx={{ height: '100%', p: 3, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main', borderBottom: '2px solid #C5A059', pb: 1, display: 'inline-block' }}>
                                    {category.title}
                                </Typography>
                                <List>
                                    {category.items.map((item, index) => (
                                        <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                                            <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                                                <CheckBoxIcon color="secondary" fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 8, textAlign: 'center', p: 4, bgcolor: 'primary.main', borderRadius: 4, color: 'white' }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Missing something?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                        Don't worry. Contact us and we will help you figure out what you need or how to obtain it.
                    </Typography>
                    <Button variant="contained" color="secondary" size="large" href="/contact">
                        Contact Us
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
