//https://github.com/recharts/recharts
//https://lodash.com/

import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

function TrainingStatistics({params})   {

    const [open, setOpen] = useState(false)
    const [trainings, setTrainings] = useState([]);

    const data = [
        {name: 'Geeksforgeeks', students: 400},
        {name: 'Technical scripter', students: 700},
        {name: 'Geek-i-knack', students: 200},
        {name: 'Geek-o-mania', students: 1000}
    ];

    //Simplified fetch of trainings with custom info 
    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.log(err))
    } 
     
      
    return ( 
        <>
            <b>Select a customer in the overview to see their training statistics</b>
            <BarChart width={600} height={600} data={data}>
                <Bar dataKey="students" fill="green" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </BarChart>
        </>
    );
}

export default TrainingStatistics;