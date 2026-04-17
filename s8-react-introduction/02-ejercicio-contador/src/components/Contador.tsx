import { useState } from 'react';

export function Contador() {
  const [count, setCount] = useState(0);

  const sumar = () => setCount((prev) => prev + 1);
  const restar = () => setCount((prev) => prev - 1);
  const resetear = () => setCount(0);

  return (
    <section className="card">
      <h2>Ejercicio 1 – Contador</h2>
      <p className="value">{count}</p>
      <div className="actions">
        <button type="button" onClick={sumar}>
          Sumar +1
        </button>
        <button type="button" onClick={restar}>
          Restar -1
        </button>
        <button type="button" onClick={resetear}>
          Reset
        </button>
      </div>
    </section>
  );
}
