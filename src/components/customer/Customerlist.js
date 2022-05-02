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

    //Adding a new customer to the list
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

    //Updating an existing customers data
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
        {field: "firstname", headerName: 'First Name', sortable: true, filter: true, width: 130},
        {field: "lastname", headerName: 'Last Name',sortable: true, filter: true, width: 130},
        {field: "streetaddress", headerName: 'Street',sortable: true, filter: true, width: 150},
        {field: "postcode", headerName: 'ZIP',sortable: true, filter: true, width: 90},
        {field: "city", sortable: true, filter: true, width: 110},
        {field: "email", sortable: true, filter: true, width: 160},
        {field: "phone", sortable: true, filter: true, width: 130},
        {
            headerName: '',
            width: 60,
            field: 'links',
            cellRenderer: params => <Editcustomer  params={params} updateCustomer={updateCustomer} />
        },
        {
            headerName: '',
            field: "links", 
            width: 60,
            cellRenderer: params => 
                <IconButton color="error" onClick={() => deleteCustomer(params.value[0].href)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]);

    return(
        <>
            &nbsp;
            <Addcustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{height: 700, width:"auto"}}>
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



