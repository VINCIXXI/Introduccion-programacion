import React, { useState, useEffect } from 'react';

const TaskForm = ({onTaskAdded, onTaskUpdated, taskToEdit, setTaskToEdit}) => {
    const [text, setText] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setText(taskToEdit.name);
        }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (taskToEdit) {
            try {
                await fetch(`/notas/${taskToEdit._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text }),
                });
                onTaskUpdated();
                setTaskToEdit(null);
            } catch (error) {
                console.error('Error al modificar la nota',error);
            }
        } else {
            try{
                await fetch('/notas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text }),
                });
                onTaskAdded();
            } catch (error) {
                console.error('Error al agregar la nota',error);
            }
        }
        setText('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Escribe una nota"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            <button type="submit">{taskToEdit ? 'Modificar nota' : 'Agregar nota'}</button>
        </form>
    );
}
export default TaskForm;