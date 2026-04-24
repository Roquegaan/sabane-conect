import { useState } from 'react';
import './App.css';
import ModuloCard from './components/ModuloCard';
import Navbar from './components/Navbar';
import { getAccessToken, fetchCursosInList } from './services/apiCursos';

function App() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vista, setVista] = useState('inicio'); // 'inicio' o 'empaquetador'

  const handleIrAlEmpaquetador = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      const data = await fetchCursosInList(token, ["000233", "000236"]);
      setCursos(data);
      setVista('empaquetador'); // Cambiamos la vista automáticamente al recibir datos
    } catch (error) {
      alert("Error al conectar con la API");
    } finally {
      setLoading(false);
    }
  };

  // --- VISTA 1: MENÚ PRINCIPAL ---
  if (vista === 'inicio') {
    return (
      <div className="app-container" style={{ padding: 0 }}>
        <Navbar />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '50px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>¡Hola, Roque!</h1>
            <p style={{ color: '#666', fontSize: '20px' }}>Bienvenido a SABANA CONNECT</p>
          </header>
          <main style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <ModuloCard
              icono="📦"
              titulo="Empaquetador de Cursos"
              descripcion="Gestiona y empaqueta cursos universitarios de forma eficiente."
              textoBoton={loading ? "Cargando..." : "Ir al Empaquetador →"}
              onclick={handleIrAlEmpaquetador}
              disabled={loading}
            />
            <ModuloCard
              icono="⚠️"
              titulo="Registro de Errores"
              descripcion="Visualiza fallos técnicos."
              textoBoton="Ver Registro"
              esAlerta={true}
            />
          </main>
        </div>
      </div>
    );
  }

  // --- VISTA 2: PÁGINA DE DATOS (EL EMPAQUETADOR) ---
  return (
    <div className="app-container" style={{ padding: 0 }}>
      <Navbar />
      <div style={{ padding: '40px 80px' }}>
        <button
          onClick={() => setVista('inicio')}
          style={{ marginBottom: '20px', cursor: 'pointer', border: 'none', background: 'none', color: '#003366', fontWeight: 'bold' }}
        >
          ← Volver al inicio
        </button>

        <h2 style={{ color: '#003366', marginBottom: '30px' }}>Panel del Empaquetador</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <thead style={{ backgroundColor: '#003366', color: 'white' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left' }}>ID SIGA</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Nombre del Curso</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Créditos</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.idCursoSiga} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>{curso.idCursoSiga}</td>
                <td style={{ padding: '15px', fontWeight: '500' }}>{curso.nombreCurso}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{curso.creditos}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <span style={{ color: 'green', fontWeight: 'bold' }}>● Activo</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;