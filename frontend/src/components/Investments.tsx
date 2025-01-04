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

const investmentTypes = [
  'Stocks',
  'Bonds',
  'Mutual Funds',
  'Real Estate',
  'Cryptocurrency',
  'Other',
];

interface Investment {
  date: string;
  amount: number;
  type: string;
  name: string;
  currentValue: number;
  notes: string;
}

const columns = [
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'amount',
    label: 'Initial Amount ($)',
    minWidth: 100,
    align: 'right' as const,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'currentValue',
    label: 'Current Value ($)',
    minWidth: 100,
    align: 'right' as const,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'type', label: 'Type', minWidth: 130 },
  { id: 'name', label: 'Investment Name', minWidth: 170 },
  { id: 'notes', label: 'Notes', minWidth: 170 },
];

const Investments = () => {
  const [open, setOpen] = useState(false);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [newInvestment, setNewInvestment] = useState<Investment>({
    date: '',
    amount: 0,
    type: '',
    name: '',
    currentValue: 0,
    notes: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setInvestments([...investments, newInvestment]);
    setNewInvestment({
      date: '',
      amount: 0,
      type: '',
      name: '',
      currentValue: 0,
      notes: '',
    });
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Investments</Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ backgroundColor: '#2D3250' }}
        >
          Add Investment
        </Button>
      </Box>

      <DataTable columns={columns} rows={investments} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Investment</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newInvestment.date}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, date: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Initial Amount"
            type="number"
            fullWidth
            value={newInvestment.amount}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, amount: Number(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Current Value"
            type="number"
            fullWidth
            value={newInvestment.currentValue}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, currentValue: Number(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Type"
            select
            fullWidth
            value={newInvestment.type}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, type: e.target.value })
            }
          >
            {investmentTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Investment Name"
            fullWidth
            value={newInvestment.name}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Notes"
            fullWidth
            multiline
            rows={4}
            value={newInvestment.notes}
            onChange={(e) =>
              setNewInvestment({ ...newInvestment, notes: e.target.value })
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

export default Investments;
