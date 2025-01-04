import { useTheme } from '@mui/material/styles';

export const useChartTheme = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return {
    textColor: isDarkMode ? '#FFFFFF' : '#2D3250',
    axisLineColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(45, 50, 80, 0.2)',
    splitLineColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(45, 50, 80, 0.1)',
    tooltipBackground: isDarkMode ? 'rgba(45, 50, 80, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  };
};
