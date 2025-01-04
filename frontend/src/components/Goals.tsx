import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import DataTable from './DataTable';

interface Goal {
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  notes: string;
}

const columns = [
  { id: 'name', label: 'Goal Name', minWidth: 170 },
  {
    id: 'targetAmount',
    label: 'Target Amount ($)',
    minWidth: 100,
    align: 'right' as const,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'currentAmount',
    label: 'Current Amount ($)',
    minWidth: 100,
    align: 'right' as const,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'targetDate', label: 'Target Date', minWidth: 100 },
  { id: 'notes', label: 'Notes', minWidth: 170 },
];

const Goals = () => {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Goal>({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    targetDate: '',
    notes: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setGoals([...goals, newGoal]);
    setNewGoal({
      name: '',
      targetAmount: 0,
      currentAmount: 0,
      targetDate: '',
      notes: '',
    });
    handleClose();
  };

  const calculateProgress = (current: number, target: number) => {
    return (current / target) * 100;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Financial Goals</Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ backgroundColor: '#2D3250' }}
        >
          Add Goal
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {goals.map((goal, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {goal.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Target: ${goal.targetAmount.toLocaleString()}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress(goal.currentAmount, goal.targetAmount)}
                  sx={{ my: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Progress: ${goal.currentAmount.toLocaleString()} (
                  {calculateProgress(
                    goal.currentAmount,
                    goal.targetAmount
                  ).toFixed(1)}
                  %)
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Target Date: {goal.targetDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Goals History
      </Typography>
      <DataTable columns={columns} rows={goals} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Financial Goal</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Goal Name"
            fullWidth
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Target Amount"
            type="number"
            fullWidth
            value={newGoal.targetAmount}
            onChange={(e) =>
              setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Current Amount"
            type="number"
            fullWidth
            value={newGoal.currentAmount}
            onChange={(e) =>
              setNewGoal({ ...newGoal, currentAmount: Number(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Target Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newGoal.targetDate}
            onChange={(e) =>
              setNewGoal({ ...newGoal, targetDate: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Notes"
            fullWidth
            multiline
            rows={4}
            value={newGoal.notes}
            onChange={(e) => setNewGoal({ ...newGoal, notes: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Goals;
