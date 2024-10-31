import React, {useEffect, useState} from 'react';
import TaskForm from './TaskForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const cargarTareas=async()=>{
        try{
            const response = await fetch('/notas');
            if(!response.ok) throw new Error('Error al cargar las notas');
            const data = await response.json();
            setTasks(data);
        }catch(error){
            console.error('Error al cargar las notas: ',error);
        }
    }

    const eliminarTarea=async(id)=>{
        try{
            await fetch(`/notas/${id}`,{
                method: 'DELETE',
            });
            cargarTareas();
        }catch(error){
            console.error('Error al eliminar la tarea: ',error);
        }
    }

    const editarTarea=(task)=>{
        setTaskToEdit(task);
    }
    useEffect(()=>{
        cargarTareas();
    },[]);

    return(
        <div>
            <TaskForm 
            onTaskAdded={cargarTareas} 
            onTaskUpdated={cargarTareas} 
            taskToEdit={taskToEdit} 
            setTaskToEdit={setTaskToEdit}/>
            <ul>
                {tasks.map((task)=>(
                    <li key={task._id}>
                        {task.text}
                        <button onClick={()=>editarTarea(task)} className='edit-button'>
                            <FontAwesomeIcon icon={faEdit}/></button>
                        <button onClick={()=>eliminarTarea(task._id)} className='delete-button'>
                            <FontAwesomeIcon icon={faTrashAlt}/></button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TaskList;