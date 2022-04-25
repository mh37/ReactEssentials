import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function Edittraining({params, updateTraining}) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    });

    const handleClickOpen = () => {
        setTraining ({
            brand: params.data.brand,
            model: params.data.model,
            color: params.data.color,
            fuel: params.data.fuel,
            year: params.data.year,
            price: params.data.price
        });
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        updateTraining(training, params.value);
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
          <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Training</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="brand"
              value={training.brand}
              onChange={inputChanged}
              label="Brand"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="model"
              value={training.model}
              onChange={inputChanged}
              label="Model"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="color"
              value={training.color}
              onChange={inputChanged}
              label="Color"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="fuel"
              value={training.fuel}
              onChange={inputChanged}
              label="Fuel"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="year"
              value={training.year}
              onChange={inputChanged}
              label="Year"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name="price"
              value={training.price}
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

export default Edittraining;