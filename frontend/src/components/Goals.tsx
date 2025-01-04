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
  Paper,
  Grid,
  LinearProgress,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../utils/api';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface Goal {
  name: string;
  target_amount: number;
  description: string;
  target_date: string;
  progress: number;
}

const Goals = () => {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Goal>({
    name: '',
    target_amount: 0,
    description: '',
    target_date: new Date().toISOString().split('T')[0],
    progress: 0,
  });
  const [errors, setErrors] = useState({
    name: false,
    target_amount: false,
    description: false,
    target_date: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const data = await api.getGoals();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
      setSnackbar({
        open: true,
        message: 'Error loading goals',
        severity: 'error',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !newGoal.name,
      target_amount: !newGoal.target_amount || newGoal.target_amount <= 0,
      description: !newGoal.description,
      target_date: !newGoal.target_date,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewGoal({
      name: '',
      target_amount: 0,
      description: '',
      target_date: new Date().toISOString().split('T')[0],
      progress: 0,
    });
    setErrors({
      name: false,
      target_amount: false,
      description: false,
      target_date: false,
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await api.addGoal(newGoal);
      await fetchGoals();
      handleClose();
      setSnackbar({
        open: true,
        message: 'Goal added successfully',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Error adding goal:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error adding goal',
        severity: 'error',
      });
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await api.deleteGoal(index);
      await fetchGoals();
      setSnackbar({
        open: true,
        message: 'Goal deleted successfully',
        severity: 'success',
      });
    } catch (error: any) {
      console.error('Error deleting goal:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error deleting goal',
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
        <Typography variant="h4">Goals</Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ backgroundColor: '#2D3250' }}
        >
          Add Goal
        </Button>
      </Box>

      <Grid container spacing={3}>
        {goals.map((goal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {goal.name}
                </Typography>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => handleDelete(index)}
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main',
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Target: ${goal.target_amount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Due: {new Date(goal.target_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {goal.description}
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {goal.progress.toFixed(1)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={goal.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: goal.progress >= 100 ? '#4CAF50' : '#2196F3',
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            required
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            error={errors.name}
            helperText={errors.name && 'Name is required'}
          />
          <TextField
            margin="dense"
            label="Target Amount"
            type="number"
            fullWidth
            required
            value={newGoal.target_amount}
            onChange={(e) =>
              setNewGoal({ ...newGoal, target_amount: Number(e.target.value) })
            }
            error={errors.target_amount}
            helperText={errors.target_amount && 'Target amount must be greater than 0'}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Target Date"
              value={dayjs(newGoal.target_date)}
              onChange={(newValue) => {
                if (newValue) {
                  setNewGoal({
                    ...newGoal,
                    target_date: newValue.format('YYYY-MM-DD'),
                  });
                }
              }}
              slotProps={{
                textField: {
                  error: errors.target_date,
                  helperText: errors.target_date && 'Target date is required',
                  fullWidth: true,
                  margin: "dense"
                }
              }}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            required
            multiline
            rows={2}
            value={newGoal.description}
            onChange={(e) =>
              setNewGoal({ ...newGoal, description: e.target.value })
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

export default Goals;
