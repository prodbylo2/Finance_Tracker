import { EChartsOption } from 'echarts-for-react';

export const getExpensePieChartConfig = (data: { name: string; value: number }[]): EChartsOption => ({
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const value = params.value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return `${params.name}: ${value} (${params.percent}%)`;
    },
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    textStyle: {
      color: '#2D3250',
    },
  },
  series: [
    {
      name: 'Expenses',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: data,
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
    },
  ],
});

export const getIncomeExpenseLineChartConfig = (
  dates: string[],
  incomeData: number[],
  expenseData: number[],
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: (params: any) => {
      const income = params[0].value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      const expense = params[1].value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return `${params[0].axisValue}<br/>
              Income: ${income}<br/>
              Expenses: ${expense}`;
    },
  },
  legend: {
    data: ['Income', 'Expenses'],
    bottom: 0,
    textStyle: {
      color: '#2D3250',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '15%',
    top: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: dates,
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#676FA3',
      },
    },
    axisLabel: {
      color: '#676FA3',
      rotate: dates.length > 12 ? 45 : 0,
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#676FA3',
      },
    },
    axisLabel: {
      color: '#676FA3',
      formatter: (value: number) =>
        value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(103, 111, 163, 0.1)',
      },
    },
  },
  series: [
    {
      name: 'Income',
      type: 'line',
      smooth: true,
      data: incomeData,
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#4CAF50',
      },
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(76, 175, 80, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(76, 175, 80, 0)',
            },
          ],
        },
      },
      animation: true,
      animationDuration: 1500,
    },
    {
      name: 'Expenses',
      type: 'line',
      smooth: true,
      data: expenseData,
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#F44336',
      },
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(244, 67, 54, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(244, 67, 54, 0)',
            },
          ],
        },
      },
      animation: true,
      animationDuration: 1500,
      animationDelay: 300,
    },
  ],
});

export const getInvestmentPerformanceChartConfig = (
  dates: string[],
  performanceData: number[],
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    formatter: (params: any) => {
      const value = params[0].value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return `${params[0].axisValue}<br/>Return: ${value}`;
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: dates,
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#676FA3',
      },
    },
    axisLabel: {
      color: '#676FA3',
      rotate: dates.length > 12 ? 45 : 0,
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#676FA3',
      },
    },
    axisLabel: {
      color: '#676FA3',
      formatter: (value: number) =>
        value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(103, 111, 163, 0.1)',
      },
    },
  },
  series: [
    {
      type: 'line',
      smooth: true,
      data: performanceData,
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#FF9800',
      },
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(255, 152, 0, 0.3)',
            },
            {
              offset: 1,
              color: 'rgba(255, 152, 0, 0)',
            },
          ],
        },
      },
      animation: true,
      animationDuration: 1500,
    },
  ],
});
