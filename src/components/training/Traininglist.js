import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Addtraining from './Addtraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from 'dayjs';


function Traininglist(){

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);

    //Fetch the list of trainings after the first render
    useEffect(() => {
        fetchTrainings();
    }, []);

    //Replaced with a simpler API call for the moment. Keep this here in case it might come in useful later
    //Fetch the list of all trainings with nested customer info query
    /*
    const fetchTrainings = async() => {
        let temp_data;
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => temp_data = data.content)
        .then(async () => 
        {
            for(let i = 0; i < temp_data.length; i++){
                let temp_element = {...temp_data[i]};
                let url = temp_element.links[2].href;
                await fetch(url)
                .then(response => response.json())
                .then(data => temp_element.customer = data.firstname + " " + data.lastname)
                .then(temp_data[i] = temp_element)
                .catch(err => console.log(err))
            }
            setTrainings(temp_data)
        })
        .catch(err => console.log(err))
    } 
    */

    //Simplified fetch of trainings with custom info 
    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.log(err))
    } 

    //Sends a delete request to the server to delete the training
    const deleteTraining = (trainingId) => {
        if(window.confirm('Are you sure you want to delete this training?')){
            fetch("https://customerrest.herokuapp.com/api/trainings/" + trainingId, {
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

    const [columns] = useState([
        {
            field: "date", 
            sortable: true, 
            filter: true, 
            width: 150,
            cellRenderer: params => {
                return dayjs(params.value).format('DD/MM/YYYY');
            }
        },
        {field: "duration", sortable: true, filter: true, width: 150},
        {field: "activity", sortable: true, filter: true, width: 200},
        {
            field: "customer", 
            sortable: true, 
            filter: true, 
            width: 200,
            cellRenderer: params => 
                params.value.firstname + " " + params.value.lastname
        },
        {
            headerName: '',
            field: "id", 
            width: 60,
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
            <div className="ag-theme-material" style={{height: 700, width:"auto"}}>
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



