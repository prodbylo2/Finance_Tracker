import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AttachMoney as ExpensesIcon,
  TrendingUp as EarningsIcon,
  AccountBalance as InvestmentsIcon,
  Flag as GoalsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Expenses', icon: <ExpensesIcon />, path: '/expenses' },
    { text: 'Earnings', icon: <EarningsIcon />, path: '/earnings' },
    { text: 'Investments', icon: <InvestmentsIcon />, path: '/investments' },
    { text: 'Goals', icon: <GoalsIcon />, path: '/goals' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 65,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 65,
          boxSizing: 'border-box',
          transition: 'width 0.2s ease-in-out',
          overflowX: 'hidden',
          backgroundColor: '#2D3250',
          color: 'white',
        },
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: open ? 'flex-end' : 'center',
        padding: '8px'
      }}>
        <IconButton onClick={onToggle} sx={{ color: 'white' }}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ 
                  opacity: open ? 1 : 0,
                  color: 'white',
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={toggleTheme}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>
            <ListItemText
              primary={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              sx={{ 
                opacity: open ? 1 : 0,
                color: 'white',
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
