import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ModuloCard from './components/ModuloCard';
import { getAccessToken, fetchCursosInList } from './services/apiCursos';
import './styles/Inicio.scss';
import './styles/Empaquetador.scss';

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

      // IDs que SI están en tu archivo response.json
      const ids = ["675851", "675852", "675908"];
      // fetchCursosInList devuelve directamente un ARRAY (ya convierte con Object.values)
      const listaArray = await fetchCursosInList(token, ids);

      // No necesitamos verificar .data porque ya es un array
      setCursos(listaArray);
    } catch (error) {
      console.error('Error cargando cursos:', error);
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleIrAlEmpaquetador = () => {
    setVista('empaquetador');
  };

  //////////////////////
  const descargarJSON = () => {
    const json = JSON.stringify(cursos, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cursos_empaquetados.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  //////////////////////////////////
  const descargarCSV = () => {
    // Encabezados
    const headers = ['ID SIGA', 'Nombre', 'Departamento', 'Créditos'];

    // Convertir cursos a filas CSV
    const rows = cursos.map(curso => [
      curso.idCursoSiga,
      `"${curso.nombreCurso}"`, // Envuelto en comillas por si tiene comas
      `"${curso.departamento?.nombre || 'N/A'}"`,
      curso.creditos
    ]);

    // Combinar encabezados y filas
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cursos_empaquetados.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (vista === 'inicio') {
    return (
      <div className="app-container" style={{ padding: 0 }}>
        <Navbar />
        <div className="inicio">
          <header>
            <h1 className="saludo">¡Hola, Roque!</h1>
            <p className="bienvenida">Bienvenido a SABANA CONNECT</p>
          </header>

          <main>
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
      <div className="empaquetador">
        <button
          onClick={() => setVista('inicio')}
          className="volver-boton"
        >
          ← Volver al inicio
        </button>

        <h2 className="titulo">Panel del Empaquetador</h2>
        <p className="descripcion">Mostrando resultados de la API de Cursos.</p>

        {/* Botones de descarga */}
        <div className="botones-descarga">
          <button
            onClick={descargarJSON}
            disabled={cursos.length === 0}
            className="boton-descarga json"
          >
            ↓ Descargar JSON
          </button>
          <button
            onClick={descargarCSV}
            disabled={cursos.length === 0}
            className="boton-descarga csv"
          >
            ↓ Descargar CSV
          </button>
        </div>

        {loading ? (
          <div className="cargando">
            Cargando cursos...
          </div>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID SIGA</th>
                <th>Nombre del Curso</th>
                <th>Departamento</th>
                <th>Créditos</th>
                <th>Modalidad</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.idCursoSiga}>
                  <td>{curso.idCursoSiga}</td>
                  <td>{curso.nombreCurso}</td>
                  <td>{curso.departamento?.nombre}</td>
                  <td>{curso.creditos}</td>
                  <td>{curso.modalidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;