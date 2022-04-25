import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Addtraining from './Addtraining';
import Edittraining from './Edittraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function Traininglist(){

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);

    //Fetch the list of trainings after the first render
    useEffect(() => {
        fetchTrainings();
    }, []);

    //Fetch the list of all trainings
    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.log(err))
    }

    //Sends a delete request to the server to delete the training
    const deleteTraining = (link) => {
        if(window.confirm('Are you sure you want to delete this training?')){
            fetch(link, {
                method: 'DELETE'
            })
            .then(response => {
                if(!response.ok){
                    alert('Training could not be deleted');
                }else
                {   
                    setOpen(true);
                    fetchTrainings();
                }
            })
            .catch(err => console.log(err))
        }
    }

    const addTraining = (newTraining) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(response => {
            if(!response.ok){
                alert('Training could not be added');
            }else
            {
                fetchTrainings();
            }
        })
        .catch(err => console.log(err))
    }

    const updateTraining = (updatedTraining, link) => {
        fetch(link, { 
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedTraining)
        })
        .then(response => {
            if(!response.ok){
                alert('Training could not be updated');
            }else
            {
                fetchTrainings();
            }
        })
        .catch(err => console.log(err))
    }

    const [columns] = useState([
        {field: "date", sortable: true, filter: true, width: 150},
        {field: "duration", sortable: true, filter: true, width: 150},
        {field: "activity", sortable: true, filter: true, width: 200},
        {field: "customer", sortable: true, filter: true, width: 200},
        {
            headerName: '',
            width: 100,
            field: '_links.self.href',
            cellRenderer: params => <Edittraining  params={params} updateTraining={updateTraining} />
        },
        {
            headerName: '',
            field: "_links.self.href", 
            width: 100,
            cellRenderer: params => 
                <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]);

    return(
        <>
            &nbsp;
            <Addtraining addTraining={addTraining}/>
            <div className="ag-theme-material" style={{height: 600, width:1000}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Training was deleted successfully"
            />
        </>
    );
};


export default Traininglist;



