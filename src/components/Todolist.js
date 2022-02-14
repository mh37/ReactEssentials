import React, { useState } from 'react'

function Todolist(){

    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        setTodos([description, ...todos]);
        setDescription('');
    }

    return(
        <div>
            <h1>Todolist</h1>
            <input 
                placeholder='Description' 
                type="text" 
                value={description}
                onChange={event => setDescription(event.target.value)}
            />
            <button onClick={addTodo}>Add</button>
            <table>
                <tbody>
                    {
                        todos.map((todo, index) =>
                            <tr key={index}> 
                                <td>{todo}</td>
                            </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    );
}

export default Todolist;