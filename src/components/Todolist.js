import React, { useState, useRef } from 'react'
import {AgGridReact} from 'ag-grid-react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Todolist(){

    const [todo, setTodo] = useState({description:'', date:'', priority:''});
    const [todos, setTodos] = useState([]);   
    const gridRef = useRef();
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (inputDate) => {
        setSelectedDate(inputDate);
        setTodo({...todo, date: inputDate.toISOString()});
    };

    const columns = [
        {field: 'description', sortable: true},
        {field: 'date', sortable: true},
        {field: 'priority', sortable: true,
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}, 
    ];

    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({description:'', date:'', priority:''});
        setSelectedDate(null);
    }

    const textInputChanged = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    }

    const deleteTodo = () => {
        if(gridRef.current.getSelectedNodes().length > 0){
            setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex));
        }else{
            alert('Select row first');
        }
    }

    return(
        <div>
            <Stack 
                direction="row" 
                spacing={1} 
                alignItems="center" 
                justifyContent="center"
            >
                <TextField  
                    label='Description'
                    name="description"
                    variant="standard"
                    value={todo.description}
                    onChange={textInputChanged}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker 
                        name="date"
                        label='Date'
                        variant="standard"
                        value={selectedDate} 
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>
                <TextField  
                    label='Priority'
                    name="priority"
                    variant="standard"
                    value={todo.priority}
                    onChange={textInputChanged}
                />
                <IconButton 
                    variant="contained" 
                    aria-label="add"
                    color="success"
                    onClick={addTodo}>
                        <AddBoxIcon/>
                </IconButton>
                <Tooltip title="Select row to delete">
                    <IconButton 
                        aria-label="delete" 
                        color="error"
                        onClick={deleteTodo}>    
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <div className="ag-theme-material" style={{height: 400, width: 800, margin: 'auto'}}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection='single'
                    rowData={todos}
                    animateRows={true}
                    columnDefs={columns}>
                </AgGridReact>
            </div>

        </div>
    );
}

export default Todolist;