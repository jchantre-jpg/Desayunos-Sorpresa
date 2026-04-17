import { useState } from 'react';

interface Tarea {
  id: number;
  texto: string;
  completed: boolean;
}

export function ListaTareas() {
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    const textoLimpio = newTask.trim();
    if (!textoLimpio) return;

    const tarea: Tarea = {
      id: Date.now(),
      texto: textoLimpio,
      completed: false,
    };

    setTasks((prev) => [...prev, tarea]);
    setNewTask('');
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const resetList = () => {
    setTasks([]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
    <section className="card">
      <h2>Ejercicio 2 – Lista de tareas</h2>

      <div className="task-input-row">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask();
          }}
        />
        <button type="button" onClick={addTask}>
          Agregar
        </button>
        <button type="button" onClick={resetList}>
          Limpiar lista
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <button
              type="button"
              className={`task-text ${task.completed ? 'done' : ''}`}
              onClick={() => toggleTask(task.id)}
            >
              {task.completed ? '✅ ' : '⬜ '}
              {task.texto}
            </button>
            <button type="button" className="delete-btn" onClick={() => removeTask(task.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
