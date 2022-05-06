import React, {useState, useEffect, useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

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

    //Simplified fetch of trainings which includes the customer info 
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

    //default column definition for AG Grid
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            resizable: true,
            flex: 1
        };
    }, []);

    //column definitions for AG Grid
    const [columns] = useState([
        {
            field: "date", 
            sortable: true, 
            filter: true, 
            cellRenderer: params => {
                return dayjs(params.value).format('DD/MM/YYYY');
            }
        },
        {
            headerName: "Time",
            field: "date", 
            sortable: true, 
            filter: true, 
            cellRenderer: params => {
                return dayjs(params.value).format('HH:mm');
            }
        },
        {field: "duration", sortable: true, filter: true},
        {field: "activity", sortable: true, filter: true},
        {
            field: "customer", 
            sortable: true, 
            filter: true, 
            cellRenderer: params => 
                params.value.firstname + " " + params.value.lastname
        },
        {
            headerName: '',
            field: "id", 
            width: 100,
            cellRenderer: params => 
                <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]);

    return(
        <>
            <div className="ag-theme-material" style={{height: 600, width:"auto"}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
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



