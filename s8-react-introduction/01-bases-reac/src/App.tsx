import './App.css';

type Estudiante = {
  nombre: string;
  edad: number;
  activo: boolean;
};

const tecnologias: string[] = ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'];

const estudiante: Estudiante = {
  nombre: 'Juliana Chantre',
  edad: 22,
  activo: true,
};

function App() {
  return (
    <main className="app">
      <h1>01 - Bases de React</h1>

      <section className="card">
        <h2>Variables y literales</h2>
        <p>Bienvenid@ al primer ejercicio de React con TypeScript.</p>
      </section>

      <section className="card">
        <h2>Objetos e interfaces</h2>
        <p>
          Nombre: <strong>{estudiante.nombre}</strong>
        </p>
        <p>Edad: {estudiante.edad}</p>
        <p>Activo: {estudiante.activo ? 'Sí' : 'No'}</p>
      </section>

      <section className="card">
        <h2>Renderizado de listas</h2>
        <ul>
          {tecnologias.map((tecnologia) => (
            <li key={tecnologia}>{tecnologia}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
