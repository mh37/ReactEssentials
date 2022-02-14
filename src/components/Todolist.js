import React, { useState } from 'react'

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
            <h1>Assignment 16 - Todolist (w. Delete)</h1>
            
            Description
            <input 
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
            <button onClick={addTodo}>Add</button>
            <table>
                <tbody>
                <tr>
                    <td><b>Date</b></td>
                    <td><b>Description</b></td>
                    <td></td>
                </tr>
                    {
                        todos.map((todos, index) =>
                            <tr key={index}> 
                                <td>{todos.date}</td>
                                <td>{todos.description}</td>
                                <td><button onClick={() => deleteTodo(index)}>Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    );
}

export default Todolist;