import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts-for-react';
import api from '../utils/api';
import { useChartTheme } from '../hooks/useChartTheme';

interface DashboardData {
  total_expenses: number;
  total_earnings: number;
  total_investments: number;
  expense_categories: Record<string, number>;
  goals_progress: Array<{ name: string; progress: number }>;
}

interface ExpenseCategory {
  name: string;
  value: number;
}

const getExpensePieChartConfig = (
  expensesByCategory: ExpenseCategory[],
  textColor: string
): EChartsOption => {
  return {
    title: {
      text: 'Expense Categories',
      left: 'center',
      textStyle: {
        color: textColor,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: ${c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: textColor,
      },
    },
    series: [
      {
        name: 'Expenses',
        type: 'pie',
        radius: '50%',
        data: expensesByCategory,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
};

const getIncomeExpenseLineChartConfig = (
  dates: string[],
  incomeData: number[],
  expenseData: number[],
  textColor: string,
  axisLineColor: string,
  splitLineColor: string
): EChartsOption => {
  return {
    title: {
      text: 'Income and Expenses',
      left: 'center',
      textStyle: {
        color: textColor,
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: ${c}',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: textColor,
      },
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      axisTick: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      splitLine: {
        lineStyle: {
          color: splitLineColor,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      axisTick: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      splitLine: {
        lineStyle: {
          color: splitLineColor,
        },
      },
    },
    series: [
      {
        name: 'Income',
        type: 'line',
        data: incomeData,
        lineStyle: {
          color: '#4CAF50',
        },
      },
      {
        name: 'Expenses',
        type: 'line',
        data: expenseData,
        lineStyle: {
          color: '#F44336',
        },
      },
    ],
  };
};

const getInvestmentPerformanceChartConfig = (
  investmentDates: string[],
  performanceData: number[],
  textColor: string,
  axisLineColor: string,
  splitLineColor: string
): EChartsOption => {
  return {
    title: {
      text: 'Investment Performance',
      left: 'center',
      textStyle: {
        color: textColor,
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: ${c}',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: textColor,
      },
    },
    xAxis: {
      type: 'category',
      data: investmentDates,
      axisLine: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      axisTick: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      splitLine: {
        lineStyle: {
          color: splitLineColor,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      axisTick: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      splitLine: {
        lineStyle: {
          color: splitLineColor,
        },
      },
    },
    series: [
      {
        name: 'Performance',
        type: 'line',
        data: performanceData,
        lineStyle: {
          color: '#2196F3',
        },
      },
    ],
  };
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { textColor, axisLineColor, splitLineColor } = useChartTheme();
  const theme = useTheme();

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

  const expensesByCategory: ExpenseCategory[] = dashboardData
    ? Object.entries(dashboardData.expense_categories).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                transition: 'all 0.3s ease-in-out',
              },
              '&::before': {
                borderLeft: `2px solid ${theme.palette.info.main}`,
                borderRight: `2px solid ${theme.palette.info.main}`,
                transform: 'scaleY(0)',
              },
              '&::after': {
                borderTop: `2px solid ${theme.palette.info.main}`,
                borderBottom: `2px solid ${theme.palette.info.main}`,
                transform: 'scaleX(0)',
              },
              '&:hover::before': {
                transform: 'scaleY(1)',
              },
              '&:hover::after': {
                transform: 'scaleX(1)',
              },
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total Balance
            </Typography>
            <Typography variant="h4">
              ${dashboardData
                ? (dashboardData.total_earnings - dashboardData.total_expenses).toLocaleString()
                : '0'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                transition: 'all 0.3s ease-in-out',
              },
              '&::before': {
                borderLeft: `2px solid ${theme.palette.success.main}`,
                borderRight: `2px solid ${theme.palette.success.main}`,
                transform: 'scaleY(0)',
              },
              '&::after': {
                borderTop: `2px solid ${theme.palette.success.main}`,
                borderBottom: `2px solid ${theme.palette.success.main}`,
                transform: 'scaleX(0)',
              },
              '&:hover::before': {
                transform: 'scaleY(1)',
              },
              '&:hover::after': {
                transform: 'scaleX(1)',
              },
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total Earnings
            </Typography>
            <Typography variant="h4">
              ${dashboardData?.total_earnings.toLocaleString() || '0'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                transition: 'all 0.3s ease-in-out',
              },
              '&::before': {
                borderLeft: `2px solid ${theme.palette.error.main}`,
                borderRight: `2px solid ${theme.palette.error.main}`,
                transform: 'scaleY(0)',
              },
              '&::after': {
                borderTop: `2px solid ${theme.palette.error.main}`,
                borderBottom: `2px solid ${theme.palette.error.main}`,
                transform: 'scaleX(0)',
              },
              '&:hover::before': {
                transform: 'scaleY(1)',
              },
              '&:hover::after': {
                transform: 'scaleX(1)',
              },
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total Expenses
            </Typography>
            <Typography variant="h4">
              ${dashboardData?.total_expenses.toLocaleString() || '0'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                transition: 'all 0.3s ease-in-out',
              },
              '&::before': {
                borderLeft: `2px solid ${theme.palette.warning.main}`,
                borderRight: `2px solid ${theme.palette.warning.main}`,
                transform: 'scaleY(0)',
              },
              '&::after': {
                borderTop: `2px solid ${theme.palette.warning.main}`,
                borderBottom: `2px solid ${theme.palette.warning.main}`,
                transform: 'scaleX(0)',
              },
              '&:hover::before': {
                transform: 'scaleY(1)',
              },
              '&:hover::after': {
                transform: 'scaleX(1)',
              },
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total Investments
            </Typography>
            <Typography variant="h4">
              ${dashboardData?.total_investments.toLocaleString() || '0'}
            </Typography>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <ReactECharts
              option={getExpensePieChartConfig(expensesByCategory, textColor)}
              style={{ height: '400px', width: '100%' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '432px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Goals Progress
            </Typography>
            <Box
              sx={{
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
              }}
            >
              {dashboardData?.goals_progress.map((goal, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: '24px' }}>
                      {index + 1}.
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {goal.name}
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 4 }}>
                    <div
                      style={{
                        width: '100%',
                        height: '10px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '5px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${goal.progress}%`,
                          height: '100%',
                          backgroundColor: '#4CAF50',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                    <Typography variant="caption" color="textSecondary">
                      {goal.progress.toFixed(1)}%
                    </Typography>
                  </Box>
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
