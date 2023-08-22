import React, { useEffect, useState } from 'react';
import EditTodos from './EditTodos';

const ListTodos = () => {
    const [todos, setTodos] = useState('');

    const getTodos = async () => {
        try {
            const res = await fetch("http://localhost:3000/todos");
            const jsonData = await res.json();

            setTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const deelteTodo = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/todos/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            const jsonData = await res.json();
            console.log(jsonData);

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <table id='table' className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos === '' ?
                            <tr>
                                <td colSpan="3">
                                    <div className="spinner-border text-primary m-5" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                            :
                            todos.length === 0 ?
                                <tr>
                                    <td colSpan="3" className='p-5'>
                                        <h4 className="text-center">No Todos Found !</h4>
                                    </td>
                                </tr> :
                                todos.map(todo => (
                                    <tr key={todo.todo_id}>
                                        <td className='align-middle'>{todo.description}</td>
                                        <td><EditTodos todo={todo} /></td>
                                        <td><button className="btn btn-danger" onClick={() => { deelteTodo(todo.todo_id) }}>Delete</button></td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>
        </>
    );
};

export default ListTodos;