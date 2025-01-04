import { EChartsOption } from 'echarts-for-react';

export const getExpensePieChartConfig = (
  data: { name: string; value: number }[],
  textColor: string
): EChartsOption => ({
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const value = params.value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return `${params.name}: ${value} (${params.percent}%)`;
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    textStyle: {
      color: textColor,
    },
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
      radius: ['40%', '70%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: textColor,
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
        color: textColor,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold',
          color: textColor,
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
  textColor: string,
  axisLineColor: string,
  splitLineColor: string
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
      return `${params[0].axisValue}<br/>Income: ${income}<br/>Expenses: ${expense}`;
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    textStyle: {
      color: textColor,
    },
  },
  legend: {
    data: ['Income', 'Expenses'],
    textStyle: {
      color: textColor,
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
    axisLabel: {
      color: textColor,
    },
    axisLine: {
      lineStyle: {
        color: axisLineColor,
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: textColor,
      formatter: (value: number) =>
        value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    axisLine: {
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
      smooth: true,
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
      data: expenseData,
      smooth: true,
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
  textColor: string,
  axisLineColor: string,
  splitLineColor: string
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: (params: any) => {
      const value = params[0].value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return `${params[0].axisValue}<br/>Performance: ${value}`;
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    textStyle: {
      color: textColor,
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
    axisLabel: {
      color: textColor,
    },
    axisLine: {
      lineStyle: {
        color: axisLineColor,
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: textColor,
      formatter: (value: number) =>
        value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
    },
    axisLine: {
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
      type: 'line',
      data: performanceData,
      smooth: true,
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
