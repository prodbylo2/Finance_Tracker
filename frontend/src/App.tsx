import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Earnings from './components/Earnings';
import Investments from './components/Investments';
import Goals from './components/Goals';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3250',
    },
    secondary: {
      main: '#424769',
    },
    background: {
      default: '#F6F6F6',
    },
    text: {
      primary: '#333333',
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              transition: 'margin 0.2s ease-in-out',
              marginLeft: sidebarOpen ? '240px' : '65px',
              bgcolor: 'background.default',
              p: 3,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/goals" element={<Goals />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
