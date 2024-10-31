import React, { useEffect, useState } from 'react';

const TaskForm=({onTaskAdded, taskToEdit, setTaskToEdit}) => {
    const [text,setText]=useState('');

    useEffect(()=>{
        if(taskToEdit){
            setText(taskToEdit.text);
        }else{
            setText('');
        }
    },[taskToEdit]);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            if(taskToEdit){
                await fetch(`http://localhost:3001/notas/${taskToEdit._id}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({text})
                });
                setTaskToEdit(null);
            }else {
            await fetch('http://localhost:3001/notas',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({text})
                })
            }

            onTaskAdded();
        }catch(error){
            console.error('Error al agregar la nota: ',error);
        }
        setText('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={text} 
            onChange={e=>setText(e.target.value)} 
            placeholder="Escribe una nota" 
            required
            />
            <button type="submit">{taskToEdit?'Actualizat nota':'Agregar nota'}</button>
        </form>
    )
}
export default TaskForm;