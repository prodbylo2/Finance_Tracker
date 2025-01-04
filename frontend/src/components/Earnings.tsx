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
  'Salary',
  'Freelance',
  'Investment',
  'Business',
  'Rental',
  'Other',
];

interface Earning {
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

const Earnings = () => {
  const [open, setOpen] = useState(false);
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [newEarning, setNewEarning] = useState<Earning>({
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
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const data = await api.getEarnings();
      setEarnings(data);
    } catch (error) {
      console.error('Error fetching earnings:', error);
      setSnackbar({
        open: true,
        message: 'Error loading earnings',
        severity: 'error',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      date: !newEarning.date,
      amount: !newEarning.amount || newEarning.amount <= 0,
      category: !newEarning.category,
      description: !newEarning.description,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEarning({
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
      await api.addEarning(newEarning);
      await fetchEarnings();
      handleClose();
      setSnackbar({
        open: true,
        message: 'Earning added successfully',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Error adding earning:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error adding earning',
        severity: 'error',
      });
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await api.deleteEarning(index);
      await fetchEarnings();
      setSnackbar({
        open: true,
        message: 'Earning deleted successfully',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Error deleting earning:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error deleting earning',
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
        <Typography variant="h4">Earnings</Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ backgroundColor: '#2D3250' }}
        >
          Add Earning
        </Button>
      </Box>

      <DataTable columns={columns} rows={earnings} onDelete={handleDelete} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Earning</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={dayjs(newEarning.date)}
              onChange={(newValue) => {
                if (newValue) {
                  setNewEarning({
                    ...newEarning,
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
            value={newEarning.amount}
            onChange={(e) =>
              setNewEarning({ ...newEarning, amount: parseFloat(e.target.value) || 0 })
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
            value={newEarning.category}
            onChange={(e) =>
              setNewEarning({ ...newEarning, category: e.target.value })
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
            value={newEarning.description}
            onChange={(e) =>
              setNewEarning({ ...newEarning, description: e.target.value })
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

export default Earnings;
