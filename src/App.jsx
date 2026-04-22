import './App.css';
import ModuloCard from './components/ModuloCard';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app-container" style={{ padding: 0 }}>
      <Navbar />

      <div style={{ padding: '60px 80px' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 'bold', margin: 0 }}>¡Hola, Roque!</h1>
          <p style={{ color: '#666', fontSize: '18px' }}>Bienvenido a SABANA CONNECT</p>
        </header>

        <main style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <ModuloCard
            icono="📦"
            titulo="Empaquetador de Cursos - API SOC"
            descripcion="Gestiona y empaqueta cursos universitarios de forma eficiente."
            textoBoton="Ir al Empaquetador →"
          />
          <ModuloCard
            icono="⚠️"
            titulo="Registro de Errores y Diagnóstico"
            descripcion="Visualiza las causas técnicas de fallos en el empaquetado."
            textoBoton="Ver Registro de Errores →"
            esAlerta={true}
          />
        </main>
      </div>
    </div>
  );
}

export default App;