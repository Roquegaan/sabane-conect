import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { getAccessToken, fetchCursosInList } from './services/apiCursos';

function ModuloCard({ titulo, descripcion, textoBoton, onclick, disabled, loading, esAlerta }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '32px',
      width: '420px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e8e8e8',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '12px',
        backgroundColor: esAlerta ? '#FEF3C7' : '#1B3A6B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {esAlerta ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L1 21h22L12 2z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" />
            <path d="M12 9v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1" fill="white" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9" />
            <path d="M2 7v10l10 5V12L2 7z" fill="white" opacity="0.6" />
            <path d="M22 7v10l-10 5V12l10-5z" fill="white" opacity="0.8" />
          </svg>
        )}
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
        {titulo}
      </h2>

      <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
        {descripcion}
      </p>

      <button
        onClick={onclick}
        disabled={disabled}
        style={{
          marginTop: '8px',
          padding: '14px 20px',
          borderRadius: '8px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'opacity 0.2s',
          opacity: disabled ? 0.7 : 1,
          backgroundColor: esAlerta ? 'transparent' : '#1B3A6B',
          color: esAlerta ? '#DC2626' : 'white',
          border: esAlerta ? '1.5px solid #DC2626' : 'none',
        }}
      >
        {loading ? 'Cargando...' : textoBoton} →
      </button>
    </div>
  );
}

function App() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vista, setVista] = useState('inicio');

  useEffect(() => {
    if (vista === 'empaquetador') {
      cargarCursos();
    }
  }, [vista]);

  const cargarCursos = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken();
      const data = await fetchCursosInList(token, ["000233", "000236"]);
      setCursos(data);
    } catch (error) {
      alert("Error al conectar con la API");
    } finally {
      setLoading(false);
    }
  };

  const handleIrAlEmpaquetador = () => {
    setVista('empaquetador');
  };

  if (vista === 'inicio') {
    return (
      <div className="app-container" style={{ padding: 0 }}>
        <Navbar />
        <div style={{ padding: '60px 60px', display: 'flex', flexDirection: 'column', gap: '50px' }}>
          <header>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: 20 }}>¡Hola, Roque!</h1>
            <p style={{ color: '#666', fontSize: '20px', margin: '8px 0 0 0' }}>Bienvenido a SABANA CONNECT</p>
          </header>

          <main style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <ModuloCard
              titulo="Empaquetador de Cursos - API SOC"
              descripcion="Gestiona y empaqueta cursos universitarios de forma eficiente. Selecciona múltiples cursos, visualiza sus detalles y genera paquetes descargables con un solo clic."
              textoBoton="Ir al Empaquetador"
              onclick={handleIrAlEmpaquetador}
              disabled={loading}
              loading={loading}
            />
            <ModuloCard
              titulo="Registro de Errores y Diagnóstico"
              descripcion="Visualiza las causas técnicas de fallos en el empaquetado. Consulta el historial de errores, logs del servidor y soluciones sugeridas para cada incidencia."
              textoBoton="Ver Registro de Errores"
              esAlerta={true}
            />
          </main>
        </div>
      </div>
    );
  }

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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Cargando cursos...
          </div>
        ) : (
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
              {cursos.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                    No hay cursos disponibles
                  </td>
                </tr>
              ) : (
                cursos.map((curso) => (
                  <tr key={curso.idCursoSiga} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>{curso.idCursoSiga}</td>
                    <td style={{ padding: '15px', fontWeight: '500' }}>{curso.nombreCurso}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>{curso.creditos}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{ color: 'green', fontWeight: 'bold' }}>● Activo</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;