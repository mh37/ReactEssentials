//https://github.com/recharts/recharts
//https://lodash.com/

import React, {Fragment, useState, useContext} from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import StatIcon from '@mui/icons-material/BarChart';
import _ from 'lodash';


function TrainingStatistics({params})   {

    const [trainingData, setTrainingData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
      firstname: '',
      lastname: '',
      link: ''
    });

    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainingData(data.map(training => {
            return {
                name: training.activity,
                duration: training.duration
            }
        })))
        .catch(err => console.log(err))
    } 

    const handleClickOpen = () => {
        setCustomer ({
            firstname: params.data.firstname,
            lastname: params.data.lastname,
            link: params.data.links[2].href
        });

        fetchTrainings();

        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const sanitizeData = (data) => {
        return(
            _(data)
            .groupBy('name')
            .map((objs, key) => {
                return {
                    'name': key,
                    'duration': _.sumBy(objs, 'duration')
                }
            })
            .value()
        );

    };


    return ( 
    
    <div>
        <IconButton variant="outlined" onClick={handleClickOpen}>
            <StatIcon />
        </IconButton>
        <Dialog 
            open={open} 
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle>{customer.firstname + " " + customer.lastname}</DialogTitle>
            <DialogContent>
                {customer.link}
                <BarChart width={600} height={600} data={sanitizeData(trainingData)}>
                    <Bar dataKey="duration" fill="blue" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </BarChart>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    </div>
        
    );
}

export default TrainingStatistics;

