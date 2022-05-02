import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';



function Addtraining({params, addTraining}) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
      customerName: params.data.firstname + " " + params.data.lastname,
      customerLink: params.value[0].href
    });

    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: customer.customerLink
    });


    //Open the form for a new training and load customer data 
    const handleClickOpen = () => {      
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        addTraining(training);
        setOpen(false);
    }

    const inputChanged = (event) => {
      setTraining({
        ...training,
        [event.target.name]: event.target.value
      });          
    }
  
    return (
      <div>
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Training for {customer.customerName}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              value={customer.customerName}
              fullWidth
              disabled
              variant="standard"
            />
            
            <TextField
              margin="dense"
              name="date"
              value={training.date}
              onChange={inputChanged}
              label="Date"
              fullWidth
              variant="standard"
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
            />

            <TextField
              margin="dense"
              name="activity"
              value={training.activity}
              onChange={inputChanged}
              label="Activity"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="duration"
              value={training.duration}
              onChange={inputChanged}
              label="Duration (minutes)"
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

export default Addtraining;


