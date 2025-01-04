import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import DataTable from './DataTable';
import api from '../utils/api';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const categories = [
  'Food & Dining',
  'Transportation',
  'Utilities',
  'Housing',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Other',
];

interface Expense {
  date: string;
  amount: number;
  category: string;
  description: string;
}

const columns = [
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'amount',
    label: 'Amount ($)',
    minWidth: 100,
    align: 'right' as const,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'category', label: 'Category', minWidth: 130 },
  { id: 'description', label: 'Description', minWidth: 170 },
];

const Expenses = () => {
  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Expense>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    category: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    date: false,
    amount: false,
    category: false,
    description: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await api.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setSnackbar({
        open: true,
        message: 'Error loading expenses',
        severity: 'error',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      date: !newExpense.date,
      amount: !newExpense.amount || newExpense.amount <= 0,
      category: !newExpense.category,
      description: !newExpense.description,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewExpense({
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      category: '',
      description: '',
    });
    setErrors({
      date: false,
      amount: false,
      category: false,
      description: false,
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await api.addExpense(newExpense);
      await fetchExpenses();
      handleClose();
      setSnackbar({
        open: true,
        message: 'Expense added successfully',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Error adding expense:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error adding expense',
        severity: 'error',
      });
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await api.deleteExpense(index);
      await fetchExpenses();
      setSnackbar({
        open: true,
        message: 'Expense deleted successfully',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Error deleting expense:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error deleting expense',
        severity: 'error',
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Expenses</Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ backgroundColor: '#2D3250' }}
        >
          Add Expense
        </Button>
      </Box>

      <DataTable columns={columns} rows={expenses} onDelete={handleDelete} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Expense</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={dayjs(newExpense.date)}
              onChange={(newValue) => {
                if (newValue) {
                  setNewExpense({
                    ...newExpense,
                    date: newValue.format('YYYY-MM-DD'),
                  });
                }
              }}
              slotProps={{
                textField: {
                  error: errors.date,
                  helperText: errors.date && 'Date is required',
                  fullWidth: true,
                  margin: "dense"
                }
              }}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            required
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })
            }
            error={errors.amount}
            helperText={errors.amount && 'Amount must be greater than 0'}
          />
          <TextField
            margin="dense"
            label="Category"
            select
            fullWidth
            required
            value={newExpense.category}
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
            error={errors.category}
            helperText={errors.category && 'Category is required'}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            required
            multiline
            rows={2}
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
            error={errors.description}
            helperText={errors.description && 'Description is required'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Expenses;
