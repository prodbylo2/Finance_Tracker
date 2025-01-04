import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import api from '../utils/api';

interface DashboardData {
  total_expenses: number;
  total_earnings: number;
  total_investments: number;
  expense_categories: { [key: string]: number };
  goals_progress: Array<{ name: string; progress: number }>;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await api.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const expenseChartOption = {
    title: {
      text: 'Expense Categories',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: ${c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Expenses',
        type: 'pie',
        radius: '50%',
        data: dashboardData
          ? Object.entries(dashboardData.expense_categories).map(([name, value]) => ({
              name,
              value,
            }))
          : [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#4CAF50',
              color: 'white'
            }}
          >
            <Typography variant="h6">Total Balance</Typography>
            <Typography variant="h4">
              ${dashboardData ? 
                (dashboardData.total_earnings - dashboardData.total_expenses).toLocaleString() 
                : '0'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#2196F3',
              color: 'white'
            }}
          >
            <Typography variant="h6">Total Earnings</Typography>
            <Typography variant="h4">
              ${dashboardData?.total_earnings.toLocaleString() || '0'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F44336',
              color: 'white'
            }}
          >
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h4">
              ${dashboardData?.total_expenses.toLocaleString() || '0'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FF9800',
              color: 'white'
            }}
          >
            <Typography variant="h6">Total Investments</Typography>
            <Typography variant="h4">
              ${dashboardData?.total_investments.toLocaleString() || '0'}
            </Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <ReactECharts option={expenseChartOption} style={{ height: '400px' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '432px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Goals Progress
            </Typography>
            <Box sx={{
              flexGrow: 1,
              overflowY: 'auto',
              pr: 2,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.3)',
                },
              },
            }}>
              {dashboardData?.goals_progress.map((goal, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    {goal.name}
                  </Typography>
                  <div style={{ 
                    width: '100%', 
                    height: '10px', 
                    backgroundColor: '#e0e0e0',
                    borderRadius: '5px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${goal.progress}%`,
                      height: '100%',
                      backgroundColor: '#4CAF50',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <Typography variant="caption" color="textSecondary">
                    {goal.progress.toFixed(1)}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
