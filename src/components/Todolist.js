import React, { useState } from 'react'
import Todotable from './Todotable';

function Todolist(){

    const [todo, setTodo] = useState({description:'', date:''});
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({description:'', date:''});
    }

    const inputChanged = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value})
    }

    const deleteTodo = (row) => {
        setTodos(todos.filter((todo, index) =>index !== row));
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
            <Todotable todos={todos} delteTodo={deleteTodo}/>


        </div>
    );
}

export default Todolist;