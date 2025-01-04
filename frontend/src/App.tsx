import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from './theme/ThemeContext';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

const App = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar open={open} onToggle={toggleDrawer} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${240}px)` },
            }}
          >
            <AppRoutes />
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
