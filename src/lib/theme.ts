'use client';
// Theme Version: 2026-01-03-21:20 - PREMIUM MODERN LIGHT
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

export const inter = Inter({
    weight: ['300', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0F172A', // Slate 900 - Elegante y profesional
            light: '#334155',
            dark: '#020617',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#8B5CF6', // Purple 500 - Acento moderno
            light: '#A78BFA',
            dark: '#7C3AED',
            contrastText: '#ffffff',
        },
        background: {
            default: '#FAFBFC', // Casi blanco, muy clean
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0F172A',
            secondary: '#64748B',
        },
        error: {
            main: '#EF4444',
        },
        success: {
            main: '#10B981',
        },
        divider: 'rgba(15, 23, 42, 0.06)',
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: {
            fontWeight: 800,
            fontSize: '2.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
        },
        h2: {
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
        },
        h3: {
            fontWeight: 700,
            fontSize: '1.75rem',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.4,
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.5,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: '#334155',
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: '#64748B',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.01em',
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0px 1px 2px rgba(0, 0, 0, 0.04)',
        '0px 2px 4px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        '0px 4px 8px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.06)',
        '0px 8px 16px rgba(0, 0, 0, 0.06), 0px 4px 8px rgba(0, 0, 0, 0.08)',
        '0px 12px 24px rgba(0, 0, 0, 0.08), 0px 6px 12px rgba(0, 0, 0, 0.1)',
        '0px 16px 32px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.12)',
        '0px 20px 40px rgba(0, 0, 0, 0.12), 0px 10px 20px rgba(0, 0, 0, 0.14)',
        '0px 24px 48px rgba(0, 0, 0, 0.14), 0px 12px 24px rgba(0, 0, 0, 0.16)',
        '0px 28px 56px rgba(0, 0, 0, 0.16), 0px 14px 28px rgba(0, 0, 0, 0.18)',
        '0px 32px 64px rgba(0, 0, 0, 0.18), 0px 16px 32px rgba(0, 0, 0, 0.2)',
        '0px 36px 72px rgba(0, 0, 0, 0.2), 0px 18px 36px rgba(0, 0, 0, 0.22)',
        '0px 40px 80px rgba(0, 0, 0, 0.22), 0px 20px 40px rgba(0, 0, 0, 0.24)',
        '0px 44px 88px rgba(0, 0, 0, 0.24), 0px 22px 44px rgba(0, 0, 0, 0.26)',
        '0px 48px 96px rgba(0, 0, 0, 0.26), 0px 24px 48px rgba(0, 0, 0, 0.28)',
        '0px 52px 104px rgba(0, 0, 0, 0.28), 0px 26px 52px rgba(0, 0, 0, 0.3)',
        '0px 56px 112px rgba(0, 0, 0, 0.3), 0px 28px 56px rgba(0, 0, 0, 0.32)',
        '0px 60px 120px rgba(0, 0, 0, 0.32), 0px 30px 60px rgba(0, 0, 0, 0.34)',
        '0px 64px 128px rgba(0, 0, 0, 0.34), 0px 32px 64px rgba(0, 0, 0, 0.36)',
        '0px 68px 136px rgba(0, 0, 0, 0.36), 0px 34px 68px rgba(0, 0, 0, 0.38)',
        '0px 72px 144px rgba(0, 0, 0, 0.38), 0px 36px 72px rgba(0, 0, 0, 0.4)',
        '0px 76px 152px rgba(0, 0, 0, 0.4), 0px 38px 76px rgba(0, 0, 0, 0.42)',
        '0px 80px 160px rgba(0, 0, 0, 0.42), 0px 40px 80px rgba(0, 0, 0, 0.44)',
        '0px 84px 168px rgba(0, 0, 0, 0.44), 0px 42px 84px rgba(0, 0, 0, 0.46)',
        '0px 88px 176px rgba(0, 0, 0, 0.46), 0px 44px 88px rgba(0, 0, 0, 0.48)',
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#FAFBFC',
                    backgroundImage: 'none',
                    fontSmoothing: 'antialiased',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    padding: '10px 20px',
                    fontWeight: 600,
                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:active': {
                        transform: 'scale(0.98)',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#0F172A',
                    color: '#ffffff',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                        backgroundColor: '#1E293B',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#8B5CF6',
                    color: '#ffffff',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                        backgroundColor: '#7C3AED',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)',
                    },
                },
                outlined: {
                    borderColor: 'rgba(15, 23, 42, 0.1)',
                    color: '#0F172A',
                    '&:hover': {
                        borderColor: '#0F172A',
                        backgroundColor: 'rgba(15, 23, 42, 0.02)',
                    }
                },
                text: {
                    color: '#64748B',
                    '&:hover': {
                        backgroundColor: 'rgba(15, 23, 42, 0.04)',
                    }
                }
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    border: '1px solid rgba(15, 23, 42, 0.06)',
                    backgroundImage: 'none',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                },
                elevation2: {
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                },
            },
        },
        MuiCard: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    border: '1px solid rgba(15, 23, 42, 0.06)',
                    backgroundColor: '#FFFFFF',
                    boxShadow: 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        borderColor: 'rgba(15, 23, 42, 0.12)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
                    boxShadow: 'none',
                    color: '#0F172A',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#FFFFFF',
                    borderRight: '1px solid rgba(15, 23, 42, 0.06)',
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    margin: '2px 8px',
                    padding: '10px 12px',
                    transition: 'all 0.15s ease',
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(139, 92, 246, 0.08)',
                        color: '#8B5CF6',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.12)',
                        },
                        '& .MuiListItemIcon-root': {
                            color: '#8B5CF6',
                        }
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(15, 23, 42, 0.04)',
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                },
                filled: {
                    backgroundColor: 'rgba(15, 23, 42, 0.06)',
                    color: '#334155',
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF',
                        transition: 'all 0.2s ease',
                        '& fieldset': {
                            borderColor: 'rgba(15, 23, 42, 0.1)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(15, 23, 42, 0.2)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#8B5CF6',
                            borderWidth: '2px',
                        }
                    },
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#8B5CF6',
                    fontWeight: 600,
                }
            }
        }
    },
});

export default theme;
