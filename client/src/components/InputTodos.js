import React, { useState } from 'react';

const InputTodo = () => {

    const [description, setDescription] = useState('');

    const onsubmitform = async (e) => {
        if (description === '') {
            e.preventDefault();
            let alert = document.getElementById('alert');
            alert.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Alert!</strong>  You should write something in the input field.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
            setTimeout(() => {
                alert.innerHTML = '';
            }, 2500);
            return;
        }
        
        try {
            const res = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description })
            });

            console.log(res);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <h1 className="text-center mt-5">TODO LIST</h1>
            <form className="d-flex gap-2 mt-5 mb-3" onSubmit={onsubmitform}>
                <input type="text" value={description} className="form-control" placeholder='Type here...' onChange={(e) => { setDescription(e.target.value) }} />
                <button type='submit' className="btn btn-success">Add</button>
            </form>
            <div id='alert'></div>
        </>
    );
};

export default InputTodo;