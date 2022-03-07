import React, { useState, useRef } from 'react'
import {AgGridReact} from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Todolist(){

    const [todo, setTodo] = useState({description:'', date:''});
    const [todos, setTodos] = useState([]);
    
    const gridRef = useRef();

    const columns = [
        {field: 'description', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true},
        {field: 'priority', sortable: true, filter: true,
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
    ];

    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({description:'', date:''});
    }

    const inputChanged = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value})
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
            <h1>Todolist</h1>
            
            Description
            <input 
                placeholder='Description'
                type="text" 
                name="description"
                value={todo.description}
                onChange={inputChanged}
            />
            Date
            <input 
                type="date" 
                name="date"
                value={todo.date}
                onChange={inputChanged}
            />
            Priority
            <input 
                placeholder='Priority'
                type="text" 
                name="priority"
                value={todo.priority}
                onChange={inputChanged}
            />
            <button onClick={addTodo}>Add</button>
            <button onClick={deleteTodo}>Delete</button>

            <div className="ag-theme-material" style={{height: 400, width: 800, margin: 'auto'}}>
                <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                rowSelection='single'
                rowData={todos}
                columnDefs={columns}>
            </AgGridReact>
            </div>

        </div>
    );
}

export default Todolist;