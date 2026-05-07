import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ModuloCard from './components/ModuloCard';
import RegistroErrores from './components/RegistroErrores';
import { getAccessToken, fetchCursosInList } from './services/apiCursos';
import './styles/Inicio.scss';
import './styles/Empaquetador.scss';
import './styles/Modal.scss';

function App() {
  const [cursos, setCursos] = useState([]);
  const [fullCursos, setFullCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vista, setVista] = useState('inicio');
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [historialErrores, setHistorialErrores] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);

  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartamentos, setSelectedDepartamentos] = useState([]);
  const [filterDropdownSearch, setFilterDropdownSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);

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
      setFullCursos(listaArray);
    } catch (error) {
      console.error('Error cargando cursos:', error);
      registrarError(null, error, 'cargarCursos');
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  // Función para filtrar cursos
  const filtrarCursos = () => {
    let filtered = Array.isArray(fullCursos) ? fullCursos : [];

    if (searchTerm) {
      filtered = filtered.filter(curso =>
        (curso?.nombreCurso || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(curso?.idCursoSiga || '').includes(searchTerm)
      );
    }

    if (selectedDepartamentos.length > 0) {
      filtered = filtered.filter(curso =>
        selectedDepartamentos.includes(curso?.departamento?.nombre)
      );
    }

    return filtered;
  };

  // Función para ordenar cursos - COMPLETAMENTE NULL-SAFE
  const ordenarCursos = (cursos) => {
    if (!Array.isArray(cursos) || !sortConfig.key) {
      return cursos;
    }

    try {
      // INMUTABILIDAD: Crear copia del array ANTES de ordenar
      const datosOrdenados = [...cursos].sort((a, b) => {
        const columna = sortConfig.key;

        // Obtener valores con null-safety
        let valorA;
        let valorB;

        if (columna === 'departamento') {
          valorA = a?.departamento?.nombre;
          valorB = b?.departamento?.nombre;
        } else {
          valorA = a?.[columna];
          valorB = b?.[columna];
        }

        // COMPARACIÓN SEGURA: Convertir a string siempre
        const valA = (valorA || '').toString().toLowerCase().trim();
        const valB = (valorB || '').toString().toLowerCase().trim();

        // Intentar comparación numérica si ambos son números válidos
        const numA = Number(valA);
        const numB = Number(valB);

        if (!isNaN(numA) && !isNaN(numB) && valA !== '' && valB !== '') {
          return sortConfig.direction === 'asc' ? numA - numB : numB - numA;
        }

        // Fallback a comparación de strings
        const comparison = valA.localeCompare(valB, 'es-ES', {
          numeric: true,
          sensitivity: 'base'
        });

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });

      return datosOrdenados;
    } catch (error) {
      console.error('Error en ordenarCursos:', error);
      // En caso de error, retornar array sin modificar
      return cursos;
    }
  };

  // Función para manejar clic en encabezado de tabla - PREVENCIÓN DE EVENTOS GARANTIZADA
  const handleSort = (event, key) => {
    if (!event) {
      return;
    }

    try {
      // PREVENCIÓN DE EVENTOS: Garantizada
      event.preventDefault();
      event.stopPropagation();

      if (!key || typeof key !== 'string') {
        return;
      }

      // Determinar dirección: cambiar a 'desc' si ya está ordenado por esta columna en 'asc'
      const newDirection = (sortConfig.key === key && sortConfig.direction === 'asc') ? 'desc' : 'asc';

      // Actualizar estado sin mutación
      setSortConfig({ key, direction: newDirection });

    } catch (error) {
      console.error('Error en handleSort:', error);
      // No propagar el error, permitir que la tabla continúe funcionando
    }
  };

  const handleViewDetails = (event, curso) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (!curso) return;
    setSelectedCurso(curso);
  };

  const handleRowClick = (curso) => {
    if (!curso) return;
    setSelectedCurso(curso);
  };

  const handleToggleDepartamento = (departamento) => {
    setSelectedDepartamentos((prev) =>
      prev.includes(departamento)
        ? prev.filter((item) => item !== departamento)
        : [...prev, departamento]
    );
  };

  const toggleCursoSeleccionado = (idCurso) => {
    const id = String(idCurso);

    setCursosSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const clearDropdownSearch = () => {
    setFilterDropdownSearch('');
  };

  const cursosFiltrados = ordenarCursos(filtrarCursos() || []);
  // Obtener departamentos únicos
  const departamentosUnicos = Array.isArray(fullCursos)
    ? [...new Set(fullCursos.map(curso => curso?.departamento?.nombre).filter(Boolean))].sort()
    : [];
  const departamentosFiltrados = departamentosUnicos.filter((departamento) =>
    departamento.toLowerCase().includes(filterDropdownSearch.toLowerCase())
  );

  // Contar filtros activos en el dropdown
  const filtrosActivos = selectedDepartamentos.length;

  const registrarError = (idCurso, error, operacion) => {
    const ahora = new Date();
    const fecha = ahora.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\//g, '-');

    const statusCode = error?.response?.status || 'ERR';
    const errorMessage = error?.response?.data?.message || error?.message || 'Error desconocido';

    const nuevoError = {
      id: historialErrores.length + 1,
      fecha,
      codigo: `ERR-${operacion.toUpperCase()}-${statusCode}`,
      descripcion: errorMessage,
      idCurso: idCurso || 'N/A',
      estado: 'Crítico',
      statusCode,
      operacion,
      timestamp: ahora.getTime(),
      logs: [
        `${fecha} - operación iniciada: ${operacion}`,
        `${fecha} - error capturado en cliente`,
        `${fecha} - código de estado: ${statusCode}`,
        `${fecha} - mensaje: ${errorMessage}`,
        `${fecha} - investigación de causa técnica iniciada`
      ]
    };

    setHistorialErrores((prev) => [nuevoError, ...prev]);
  };

  const handleIrAlEmpaquetador = () => {
    setVista('empaquetador');
  };

  const handleIrARegistroErrores = () => {
    setVista('errores');
  };

  const buscarCursoPorId = async (idIngresado) => {
    if (!/^[0-9]+$/.test(idIngresado)) {
      alert('Por favor, ingresa un ID SIGA válido para buscar');
      return;
    }

    try {
      setLoading(true);
      const token = await getAccessToken();
      const resultado = await fetchCursosInList(token, [idIngresado]);
      setCursos(resultado);
      setFullCursos(resultado); // Actualizar fullCursos también
    } catch (error) {
      console.error('Error buscando curso por ID:', error);
      registrarError(idIngresado, error, 'buscar');
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const limpiarBusqueda = () => {
    setSearchTerm('');
    setSelectedDepartamentos([]);
    setFilterDropdownSearch('');
    setSortConfig({ key: null, direction: 'asc' });
    setShowFilters(false);
    if (fullCursos.length > 0) {
      setCursos(fullCursos);
    } else {
      cargarCursos();
    }
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
        <Navbar
          onSearch={buscarCursoPorId}
          onClearSearch={limpiarBusqueda}
          showSearch={false}
        />
        <div className="inicio">
          <header>
            <h1 className="saludo">¡Hola!</h1>
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
              onclick={handleIrARegistroErrores}
            />
          </main>
        </div>
      </div>
    );
  }
  if (vista === 'errores') {
    return (
      <div className="app-container" style={{ padding: 0 }}>

        <Navbar
          onSearch={buscarCursoPorId}
          onClearSearch={limpiarBusqueda}
          showSearch={false}
        />

        <button
          onClick={() =>
            registrarError(
              "PRUEBA-001",
              new Error("Error de prueba del sistema"),
              "test"
            )
          }
        >
          Probar módulo de errores
        </button>

        <RegistroErrores
          onBack={() => setVista('inicio')}
          historialErrores={historialErrores}
        />

      </div>
    );
  }

  return (
    <div className="app-container" style={{ padding: 0 }}>
      <Navbar
        onSearch={buscarCursoPorId}
        onClearSearch={limpiarBusqueda}
        showSearch={false}
      />
      <div className="empaquetador">
        {/* Nuevo contenedor para alinear todo a la izquierda */}
        <div className="header-seccion">
          <button
            onClick={() => setVista('inicio')}
            className="volver-boton"
          >
            ← Volver al inicio
          </button>

          <h2 className="titulo">Panel del Empaquetador</h2>
          <p className="descripcion">Mostrando resultados de la API de Cursos.</p>
        </div>

        <div className="header-acciones">
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

          {/* Controles de tabla */}
          <div className="table-controls">
            <button
              className="filtros-btn"
              onClick={() => setShowFilters(!showFilters)}
              type="button"
            >
              Filtros
              {filtrosActivos > 0 && (
                <span className="badge">{filtrosActivos}</span>
              )}
              <span className={`arrow ${showFilters ? 'open' : ''}`}>▼</span>
            </button>
            <div className="search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar cursos"
                className="search-input"
              />
              <span className="search-icon">🔍</span>
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  aria-label="Limpiar búsqueda"
                >
                  ×
                </button>
              )}
            </div>

            {showFilters && (
              <div className="filtros-dropdown">
                <div className="dropdown-header">
                  <button
                    type="button"
                    className="dropdown-back"
                    onClick={() => setShowFilters(false)}
                  >
                    ←
                  </button>
                  <div className="dropdown-title">Programa / Departamento Académi...</div>
                </div>

                <div className="dropdown-search-row">

                  <div className="dropdown-search-wrapper">
                    <input
                      type="text"
                      value={filterDropdownSearch}
                      onChange={(e) => setFilterDropdownSearch(e.target.value)}
                      placeholder="Buscar..."
                      className="dropdown-search-input"
                    />
                    <span className="dropdown-search-icon">🔍</span>
                  </div>
                </div>

                <div className="lista-desplegable">
                  {departamentosFiltrados.map((dept) => (
                    <label key={dept} className="fila-opcion">
                      <div className="fila-contenido">
                        <input
                          type="checkbox"
                          checked={selectedDepartamentos.includes(dept)}
                          onChange={() => handleToggleDepartamento(dept)}
                        />
                        <span>{dept}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="cargando">
            Cargando cursos...
          </div>) : cursosFiltrados.length === 0 ? (
            <div className="sin-cursos">
              No hay cursos disponibles. Ajustá la búsqueda o los filtros.
            </div>) : (
          <table className="tabla">
            <thead>
              <tr>
                <th></th>
                <th
                  onClick={(e) => handleSort(e, 'idCursoSiga')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => e.key === 'Enter' && handleSort(e, 'idCursoSiga')}
                >
                  ID SIGA {sortConfig.key === 'idCursoSiga' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={(e) => handleSort(e, 'nombreCurso')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => e.key === 'Enter' && handleSort(e, 'nombreCurso')}
                >
                  Nombre del Curso {sortConfig.key === 'nombreCurso' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={(e) => handleSort(e, 'departamento')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => e.key === 'Enter' && handleSort(e, 'departamento')}
                >
                  Departamento {sortConfig.key === 'departamento' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={(e) => handleSort(e, 'creditos')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(e) => e.key === 'Enter' && handleSort(e, 'creditos')}
                >
                  Créditos {sortConfig.key === 'creditos' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th>Modalidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursosFiltrados.map((curso) => (
                <tr
                  key={curso?.idCursoSiga ?? Math.random()}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={cursosSeleccionados.includes(
                        String(curso?.idCursoSiga)
                      )}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() =>
                        toggleCursoSeleccionado(
                          String(curso?.idCursoSiga)
                        )
                      }
                    />
                  </td>
                  <td>{curso?.idCursoSiga ?? 'N/A'}</td>
                  <td>{curso?.nombreCurso ?? 'Sin nombre'}</td>
                  <td>{curso?.departamento?.nombre ?? 'N/A'}</td>
                  <td>{curso?.creditos ?? 'N/A'}</td>
                  <td>{curso?.modalidad ?? 'N/A'}</td>
                  <td>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(e, curso);
                      }}
                    >
                      Ver Descripción
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedCurso && (
          <div className="modal-overlay" onClick={() => setSelectedCurso(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedCurso?.nombreCurso ?? 'Curso seleccionado'}</h2>
              <p>{selectedCurso?.descripcion ?? 'No hay descripción disponible.'}</p>
              <div className="detalles-tecnicos">
                <h3>Detalles Técnicos</h3>
                <p>Nivel de Formación: {selectedCurso?.nivelFormacion ?? 'N/A'}</p>
                <p>Idioma: {selectedCurso?.idioma ?? 'N/A'}</p>
                <p>Total de Horas: {selectedCurso?.totalHoras ?? 'N/A'}</p>
              </div>
              <button onClick={() => setSelectedCurso(null)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;