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
  MenuItem,
} from '@mui/material';
import DataTable from './DataTable';

const categories = [
  'Salary',
  'Freelance',
  'Investments',
  'Business',
  'Rental Income',
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
    date: '',
    amount: 0,
    category: '',
    description: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setEarnings([...earnings, newEarning]);
    setNewEarning({
      date: '',
      amount: 0,
      category: '',
      description: '',
    });
    handleClose();
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

      <DataTable columns={columns} rows={earnings} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Earning</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEarning.date}
            onChange={(e) =>
              setNewEarning({ ...newEarning, date: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={newEarning.amount}
            onChange={(e) =>
              setNewEarning({ ...newEarning, amount: Number(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Category"
            select
            fullWidth
            value={newEarning.category}
            onChange={(e) =>
              setNewEarning({ ...newEarning, category: e.target.value })
            }
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
            value={newEarning.description}
            onChange={(e) =>
              setNewEarning({ ...newEarning, description: e.target.value })
            }
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

export default Earnings;
