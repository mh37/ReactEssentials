import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function Editcustomer({params, updateCustomer}) {
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

    // Open the dialog and set the customer values
    const handleClickOpen = () => {
        setCustomer ({
            firstname: params.data.firstname,
            lastname: params.data.lastname,
            email: params.data.email,
            phone: params.data.phone,
            streetaddress: params.data.streetaddress,
            postcode: params.data.postcode,
            city: params.data.city
        });
        setOpen(true);
    };
  
    // Close the dialog
    const handleClose = () => {
      setOpen(false);
    };

    // Update the customer, close the dialog and save the changes
    const handleSave = () => {
        updateCustomer(customer, params.value[0].href);
        setOpen(false);
    }

    //Event handler for the text fields
    const inputChanged = (event) => {
        setCustomer({
            ...customer,
            [event.target.name]: event.target.value
        });
    }
  
    return (
      <div>
        <IconButton color="primary" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
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
              label="Last name"
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
              label="Phone"
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
      </div>
    );
}

export default Editcustomer;