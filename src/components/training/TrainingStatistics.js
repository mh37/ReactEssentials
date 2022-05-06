import React, {useState} from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
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
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
      firstname: '',
      lastname: ''
    });

    //Fetches the training data for the specific customer
    const fetchTrainings = () => {
        fetch(params.data.links[2].href)
        .then(response => response.json())
        .then(data => setTrainingData(data.content.map(training => {
            return {
                name: training.activity,
                duration: training.duration
            }
        })))
        .catch(err => console.log(err))
    } 

    //Opens the dialog and sets the customer name, then fetches the trainings and opens the dialog
    const handleClickOpen = () => {
        setCustomer ({
            firstname: params.data.firstname,
            lastname: params.data.lastname,
        });

        fetchTrainings();

        setOpen(true);
    };
  
    //Closes the dialog
    const handleClose = () => {
      setOpen(false);
    };

    //Sanitze the data and merging duplicate categories and summing the value
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
            <DialogTitle><b>Training Summary:</b> {customer.firstname + " " + customer.lastname}</DialogTitle>
            <DialogContent>
                {customer.link}
                <BarChart width={600} height={600} data={sanitizeData(trainingData)}>
                    <Bar dataKey="duration" fill="#8884d8" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
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

