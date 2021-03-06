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
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    //open the dialog box
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    //close the dialog box
    const handleClose = () => {
      setOpen(false);
    };

    //handle the new customer saving
    const handleSave = () => {
        addCustomer(customer);
        setOpen(false);
    }

    //handle the input changes
    const inputChanged = (event) => {
        setCustomer({
            ...customer,
            [event.target.name]: event.target.value
        });
    }
  
    return (
      <>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Customer</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="firstname"
              value={customer.firstname}
              onChange={inputChanged}
              label="First Name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="lastname"
              value={customer.lastname}
              onChange={inputChanged}
              label="Last Name"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="email"
              value={customer.email}
              onChange={inputChanged}
              label="Email"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="phone"
              value={customer.phone}
              onChange={inputChanged}
              label="Phone number"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="streetaddress"
              value={customer.streetaddress}
              onChange={inputChanged}
              label="Street Address"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="postcode"
              value={customer.postcode}
              onChange={inputChanged}
              label="Post Code"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="city"
              value={customer.city}
              onChange={inputChanged}
              label="City"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </>
    );
}

export default Addcustomer;