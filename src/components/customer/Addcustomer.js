import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Addcustomer({addCustomer}) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        addCustomer(customer);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({
            ...customer,
            [event.target.name]: event.target.value
        });
    }
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Customer</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="brand"
              value={customer.brand}
              onChange={inputChanged}
              label="Brand"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="model"
              value={customer.model}
              onChange={inputChanged}
              label="Model"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="color"
              value={customer.color}
              onChange={inputChanged}
              label="Color"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="fuel"
              value={customer.fuel}
              onChange={inputChanged}
              label="Fuel"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="year"
              value={customer.year}
              onChange={inputChanged}
              label="Year"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="price"
              value={customer.price}
              onChange={inputChanged}
              label="Price"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default Addcustomer;