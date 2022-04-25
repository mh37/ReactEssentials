import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function Customerlist(){

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);

    //Fetch the list of customers after the first render
    useEffect(() => {
        fetchCustomers();
    }, []);

    //Fetch the list of all customers
    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.log(err))
    }

    //Sends a delete request to the server to delete the customer
    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure you want to delete this customer?')){
            fetch(link, {
                method: 'DELETE'
            })
            .then(response => {
                if(!response.ok){
                    alert('Customer could not be deleted');
                }else
                {   
                    setOpen(true);
                    fetchCustomers();
                }
            })
            .catch(err => console.log(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(response => {
            if(!response.ok){
                alert('Customer could not be added');
            }else
            {
                fetchCustomers();
            }
        })
        .catch(err => console.log(err))
    }

    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, { 
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if(!response.ok){
                alert('Customer could not be updated');
            }else
            {
                fetchCustomers();
            }
        })
        .catch(err => console.log(err))
    }

    const [columns] = useState([
        {field: "firstname", sortable: true, filter: true, width: 150},
        {field: "lastname", sortable: true, filter: true, width: 150},
        {field: "streetaddress", sortable: true, filter: true, width: 150},
        {field: "postcode", sortable: true, filter: true, width: 150},
        {field: "city", sortable: true, filter: true, width: 100},
        {field: "email", sortable: true, filter: true, width: 100},
        {field: "phone", sortable: true, filter: true, width: 150},
        {
            headerName: '',
            width: 100,
            field: 'links.href',
            cellRenderer: params => <Editcustomer  params={params} updateCustomer={updateCustomer} />
        },
        {
            headerName: '',
            field: "links.href", 
            width: 100,
            cellRenderer: params => 
                <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]);

    return(
        <>
            &nbsp;
            <Addcustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{height: 600, width:1000}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Customer was deleted successfully"
            />
        </>
    );
};


export default Customerlist;



