import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from '../training/Addtraining';
import Button from '@mui/material/Button';
import { render } from 'react-dom';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function Customerlist(){

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const gridRef = useRef();

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

    //Adding a new customer to the list with POST
    const addCustomer = (newCustomer) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        };
        fetch("https://customerrest.herokuapp.com/api/customers", requestOptions)
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
                fetchCustomers();
            }
        })
        .catch(err => console.log(err))
    }

    //Updating an existing customers data
    const updateCustomer = (updatedCustomer, link) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        };
        fetch(link, requestOptions)
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

    const getParams = () => {
        return {
            columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone'],
        };
    };

    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv(getParams());
      }, []);

    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            resizable: true,
            minWidth: 100,
            flex: 1,
        };
    }, []);

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
            cellRenderer: params => 
                <Addtraining  params={params} addTraining={addTraining} />
        },
        {
            headerName: '',
            width: 60,
            field: 'links',
            cellRenderer: params => 
                <Editcustomer  params={params} updateCustomer={updateCustomer} />
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

    const popupParent = useMemo(() => {
        return document.body;
      }, []);

    return(
        <>
            <Addcustomer addCustomer={addCustomer}/>
            &nbsp;
            <Button variant="outlined" onClick={onBtnExport} startIcon={<DownloadIcon />}>
                Export
            </Button>
            <div className="ag-theme-material" style={{height: 700, width:"auto"}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    defaultColDef={defaultColDef}
                    suppressExcelExport={true}
                    popupParent={popupParent}
                    ref={gridRef}
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



