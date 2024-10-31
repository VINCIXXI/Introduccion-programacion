import React, { useEffect, useState} from 'react';
import TaskForm from './TaskForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons';

const TaskList=()=>{
    const [tasks,setTasks]=useState([]);
    const [taskToEdit,setTaskToEdit]=useState(null);

    const cargarTareas=async()=>{
        try{
            const response=await fetch('http://localhost:3001/notas');
            if(!response.ok) throw new Error('Error al cargar las notas');
            const data=await response.json();
            setTasks(data);
        }catch(error){
            console.error('Error al cargar las notas: ',error);
        }
    }

    const eliminarTarea=async(id)=>{
        try{
            await fetch(`http://localhost:3001/notas/${id}`,{
                method:'DELETE'
            });
            cargarTareas();
        }catch(error){
            console.error('Error al eliminar la nota: ',error);
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
            setTaskToEdit={setTaskToEdit}
            />
            <table>
                <thead>
                    <tr>
                        <th>Nota</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task)=>(
                        <tr key={task._id}>
                            <td>{task.text}</td>
                            <td>
                                <div>
                                    <button className='edit-button' onClick={()=>editarTarea(task)}>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </button>
                                    <button className='delete-button' onClick={()=>eliminarTarea(task._id)}>
                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default TaskList;