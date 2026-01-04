'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

export const inter = Inter({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// TEMA COMPLETAMENTE NUEVO - MODERNO Y CLEAN
const newTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6366F1', // Indigo moderno
            light: '#818CF8',
            dark: '#4F46E5',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#EC4899', // Pink accent
            light: '#F472B6',
            dark: '#DB2777',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#F9FAFB',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#111827',
            secondary: '#6B7280',
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h4: {
            fontWeight: 700,
            fontSize: '1.75rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    padding: '12px 24px',
                    boxShadow: 'none',
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#FFFFFF',
                    borderRight: '1px solid #E5E7EB',
                }
            }
        },
    },
});

export default newTheme;
