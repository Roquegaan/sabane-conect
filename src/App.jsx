import './App.css';
import ModuloCard from './components/ModuloCard';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>¡Hola, Roque!</h1>
        <p>Bienvenido a SABANA CONNECT</p>
      </header>

      <main style={{ display: 'flex', gap: '100px', flexWrap: 'wrap' }}>
        <ModuloCard
          icono="📦"
          titulo="Empaquetador de Cursos - API SOC"
          descripcion="Gestiona y empaqueta cursos universitarios de forma eficiente..."
          textoBoton="Ir al Empaquetador →"
        />

        <ModuloCard
          icono="⚠️"
          titulo="Registro de Errores y Diagnóstico"
          descripcion="Visualiza las causas técnicas de fallos en el empaquetado. Consulta el historial de errores, logs del servidor y soluciones sugeridas para cada incidencia."
          textoBoton="Ver Registro de Errores →"
          esAlerta={true}
        />
      </main>
    </div>
  );
}

export default App;