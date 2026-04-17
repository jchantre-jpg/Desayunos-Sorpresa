import './App.css';
import { Contador } from './components/Contador';
import { ListaTareas } from './components/ListaTareas';

function App() {
  return (
    <main className="app">
      <h1>Taller 02 – useState, listas e interfaces</h1>
      <Contador />
      <ListaTareas />
    </main>
  );
}

export default App;
