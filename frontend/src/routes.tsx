import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Earnings from './components/Earnings';
import Investments from './components/Investments';
import Goals from './components/Goals';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/earnings" element={<Earnings />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/goals" element={<Goals />} />
    </Routes>
  );
};

export default AppRoutes;
