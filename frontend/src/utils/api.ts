import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface FinanceItem {
  date: string;
  amount: number;
  category?: string;
  description?: string;
  type?: string;
  name?: string;
  notes?: string;
  currentValue?: number;
  targetAmount?: number;
  currentAmount?: number;
  targetDate?: string;
}

const api = {
  // Dashboard
  getDashboardData: async () => {
    const response = await axios.get(`${API_BASE_URL}/dashboard`);
    return response.data;
  },

  // Expenses
  getExpenses: async () => {
    const response = await axios.get(`${API_BASE_URL}/expenses`);
    return response.data;
  },
  addExpense: async (expense: FinanceItem) => {
    const response = await axios.post(`${API_BASE_URL}/expenses`, expense);
    return response.data;
  },

  // Earnings
  getEarnings: async () => {
    const response = await axios.get(`${API_BASE_URL}/earnings`);
    return response.data;
  },
  addEarning: async (earning: FinanceItem) => {
    const response = await axios.post(`${API_BASE_URL}/earnings`, earning);
    return response.data;
  },

  // Investments
  getInvestments: async () => {
    const response = await axios.get(`${API_BASE_URL}/investments`);
    return response.data;
  },
  addInvestment: async (investment: FinanceItem) => {
    const response = await axios.post(`${API_BASE_URL}/investments`, investment);
    return response.data;
  },

  // Goals
  getGoals: async () => {
    const response = await axios.get(`${API_BASE_URL}/goals`);
    return response.data;
  },
  addGoal: async (goal: FinanceItem) => {
    const response = await axios.post(`${API_BASE_URL}/goals`, goal);
    return response.data;
  },
};

export default api;
