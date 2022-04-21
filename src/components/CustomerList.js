import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function CustomerList(){

    const [cars, setCars] = useState([]);
    const [open, setOpen] = React.useState(false);

    //Fetch the list of cars after the first render
    useEffect(() => {
        fetchCars();
    }, []);

    //Fetch the list of all cars
    const fetchCars = () => {
        fetch(process.env.REACT_APP_API_URL)
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.log(err))
    }

    //Sends a delete request to the server to delete the car
    const deleteCar = (link) => {
        if(window.confirm('Are you sure you want to delete this car?')){
            fetch(link, {
                method: 'DELETE'
            })
            .then(response => {
                if(!response.ok){
                    alert('Car could not be deleted');
                }else
                {   
                    setOpen(true);
                    fetchCars();
                }
            })
            .catch(err => console.log(err))
        }
    }

    const addCar = (newCar) => {
        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCar)
        })
        .then(response => {
            if(!response.ok){
                alert('Car could not be added');
            }else
            {
                fetchCars();
            }
        })
        .catch(err => console.log(err))
    }

    const updateCar = (updatedCar, link) => {
        fetch(link, { 
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if(!response.ok){
                alert('Car could not be updated');
            }else
            {
                fetchCars();
            }
        })
        .catch(err => console.log(err))
    }

    const [columns] = useState([
        {field: "brand", sortable: true, filter: true, width: 150},
        {field: "model", sortable: true, filter: true, width: 150},
        {field: "color", sortable: true, filter: true, width: 100},
        {field: "fuel", sortable: true, filter: true, width: 100},
        {field: "year", sortable: true, filter: true, width: 100},
        {field: "price", sortable: true, filter: true, width: 100},
        {
            
        },
        {
            headerName: '',
            field: "_links.self.href", 
            width: 100,
            cellRenderer: params => 
                <IconButton color="error" onClick={() => deleteCar(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]);

    return(
        <>
            &nbsp;
      
            <div className="ag-theme-material" style={{height: 600, width:1000}}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Car was deleted successfully"
            />
        </>
    );
};

export default CustomerList;