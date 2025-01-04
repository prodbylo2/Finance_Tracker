import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2D3250',
      light: '#424769',
      dark: '#1E2235',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#676FA3',
      light: '#8B92C5',
      dark: '#4C5282',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F6F6F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3250',
      secondary: '#676FA3',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#2D3250',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2D3250',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#2D3250',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2D3250',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2D3250',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2D3250',
    },
    subtitle1: {
      fontSize: '1rem',
      color: '#676FA3',
    },
    subtitle2: {
      fontSize: '0.875rem',
      color: '#676FA3',
    },
    body1: {
      fontSize: '1rem',
      color: '#2D3250',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#2D3250',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(45, 50, 80, 0.1)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(45, 50, 80, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(45, 50, 80, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(103, 111, 163, 0.2)',
        },
        head: {
          fontWeight: 600,
          color: '#2D3250',
          backgroundColor: 'rgba(103, 111, 163, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export default theme;
