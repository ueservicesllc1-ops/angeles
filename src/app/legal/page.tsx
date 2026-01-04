'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function LegalPage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h3" sx={{ mb: 6, fontWeight: 700 }}>
                    Legal Information
                </Typography>

                <Paper sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="legal tabs" textColor="primary" indicatorColor="primary">
                            <Tab label="Privacy Policy" />
                            <Tab label="Terms of Service" />
                            <Tab label="Tax Disclaimer" />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={value} index={0}>
                        <Typography variant="h5" gutterBottom>Privacy Policy</Typography>
                        <Typography variant="body2" paragraph>
                            <strong>Last Updated: January 1, 2026</strong>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Angeles Tax, Bookkeeping & Multiservices ("we," "us," or "our") respects your privacy and is committed to protecting it through our compliance with this policy.
                        </Typography>
                        <Typography variant="h6" gutterBottom>Information We Collect</Typography>
                        <Typography variant="body1" paragraph>
                            We collect several types of information from and about users of our Website, including information by which you may be personally identified, such as name, postal address, e-mail address, telephone number, and social security number (when provided for tax purposes).
                        </Typography>
                        <Typography variant="h6" gutterBottom>Data Security</Typography>
                        <Typography variant="body1" paragraph>
                            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls.
                        </Typography>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        <Typography variant="h5" gutterBottom>Terms & Conditions</Typography>
                        <Typography variant="body1" paragraph>
                            By using this website, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                        </Typography>
                        <Typography variant="h6" gutterBottom>Services</Typography>
                        <Typography variant="body1" paragraph>
                            Angeles Tax provides tax preparation, bookkeeping, and incorporation services. We do not provide legal advice. Any information provided on this site is for general informational purposes only and does not constitute legal or financial advice.
                        </Typography>
                        <Typography variant="h6" gutterBottom>Payment</Typography>
                        <Typography variant="body1" paragraph>
                            Payment for services is due at the time service is rendered unless otherwise agreed upon in writing. We reserve the right to withhold completed tax returns until payment is made in full.
                        </Typography>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={2}>
                        <Typography variant="h5" gutterBottom>Tax Disclaimer</Typography>
                        <Typography variant="body1" paragraph>
                            The information on this website is provided for general informational purposes only and should not be construed as specific tax, legal, or financial advice. Tax laws are subject to change and may vary depending on your specific circumstances.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>IRS Circular 230 Disclosure:</strong> To ensure compliance with requirements imposed by the IRS, we inform you that any U.S. federal tax advice contained in this communication (including any attachments) is not intended or written to be used, and cannot be used, for the purpose of (i) avoiding penalties under the Internal Revenue Code or (ii) promoting, marketing, or recommending to another party any transaction or matter addressed herein.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You should consult with a professional tax advisor to discuss your specific situation.
                        </Typography>
                    </CustomTabPanel>
                </Paper>
            </Container>
        </Box>
    );
}
