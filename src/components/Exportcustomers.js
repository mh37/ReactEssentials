import React, {useState} from 'react';
import Button from '@mui/material/Button';

function ExportCustomers(){

    const handleClickExportButton = () => {
        console.log('Export button clicked');
    }
     

    return ( 
        <>
        
            <Button variant="contained" onClick={handleClickExportButton}>
            Export Customers
            </Button>
       
        </>
    );
}

export default ExportCustomers;