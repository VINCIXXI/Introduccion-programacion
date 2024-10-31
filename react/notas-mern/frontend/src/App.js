import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './styles.css';

function App() {
  return (
    <div className="App">
      <h1>Gestor de notas</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
