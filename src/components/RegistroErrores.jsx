import { useState, useMemo } from 'react';
import '../styles/RegistroErrores.scss';

const obtenerDiagnostico = (codigoError, operacion, idCurso) => {
  const causasSolucionesPorCodigo = {
    401: {
      causa: [
        'Token de autenticación expirado o inválido.',
        'Credenciales del cliente no autorizadas.',
        'Error en la transmisión del header de autorización.'
      ],
      solucion: [
        'Obtener un nuevo token de acceso.',
        'Verificar que las credenciales sean correctas.',
        'Reiniciar la sesión del usuario.'
      ]
    },
    403: {
      causa: [
        'El token válido pero el usuario no tiene permisos.',
        'Restricción de acceso en el endpoint solicitado.',
        'IP bloqueada o cuenta restringida.'
      ],
      solucion: [
        'Verificar permisos del usuario en el servidor.',
        'Contactar al administrador para elevar privilegios.',
        'Revisar políticas de acceso en el firewall.'
      ]
    },
    404: {
      causa: [
        `El recurso con ID ${idCurso} no existe en la base de datos.`,
        'El endpoint de la API no fue encontrado.',
        'Error de tipografía en la URL del recurso.'
      ],
      solucion: [
        `Verificar que el ID ${idCurso} sea válido y exista.`,
        'Revisar la URL del endpoint en la configuración.',
        'Consultar con el equipo de backend sobre el recurso.'
      ]
    },
    500: {
      causa: [
        'Error interno no controlado en el servidor API.',
        'Fallo en la base de datos del backend.',
        'Excepción no manejada en el servicio.'
      ],
      solucion: [
        'Esperar a que el equipo de backend resuelva el problema.',
        'Reintentar la operación después de unos minutos.',
        'Escalar el incidente al equipo de soporte.'
      ]
    },
    502: {
      causa: [
        'El servidor gateway no pudo conectar con el backend.',
        'Servicio de backend no disponible o apagado.',
        'Problemas de red entre servidores.'
      ],
      solucion: [
        'Verificar el estado del servidor API.',
        'Esperar a que el servicio se reinicie.',
        'Contactar al equipo de infraestructura.'
      ]
    },
    503: {
      causa: [
        'El servidor está bajo mantenimiento.',
        'Sobrecarga de solicitudes (rate limiting activado).',
        'Servicio temporalmente no disponible.'
      ],
      solucion: [
        'Esperar el tiempo indicado antes de reintentar.',
        'Reducir la frecuencia de solicitudes al servidor.',
        'Consultar el estado en el dashboard del servicio.'
      ]
    },
    504: {
      causa: [
        'Timeout: la solicitud tardó demasiado en responder.',
        'Backend procesando una solicitud muy larga.',
        'Latencia de red muy alta.'
      ],
      solucion: [
        'Reintentar la solicitud después de unos segundos.',
        'Verificar la conexión de red.',
        'Revisar si hay consultas pesadas ejecutándose.'
      ]
    }
  };

  const diagnostico = causasSolucionesPorCodigo[codigoError] || {
    causa: [
      'Error desconocido en la comunicación con la API.',
      'Verifique el estado de su conexión a internet.',
      'Consulte con el equipo de soporte si el problema persiste.'
    ],
    solucion: [
      'Reintentar la operación.',
      'Limpiar el cache del navegador.',
      'Contactar al equipo de soporte técnico.'
    ]
  };

  return diagnostico;
};

function RegistroErrores({ onBack, historialErrores = [] }) {
  const [selectedError, setSelectedError] = useState(historialErrores[0] || null);

  const erroresConDiagnostico = useMemo(() => {
    return historialErrores.map((error) => {
      const diagnostico = obtenerDiagnostico(error.statusCode, error.operacion, error.idCurso);
      return {
        ...error,
        causa: diagnostico.causa,
        solucion: diagnostico.solucion
      };
    });
  }, [historialErrores]);

  const totalCriticos = erroresConDiagnostico.filter((item) => item.estado === 'Crítico').length;
  const totalResueltos = erroresConDiagnostico.filter((item) => item.estado === 'Resuelto').length;
  const ultimas24 = erroresConDiagnostico.length;

  const errorSeleccionado = selectedError || (erroresConDiagnostico.length > 0 ? erroresConDiagnostico[0] : null);

  return (
    <div className="registro-errores">
      <div className="seccion-encabezado">
        <div>
          <h1>Registro de Errores y Diagnóstico</h1>
          <p>Monitorea los incidentes, revisa sus causas y sigue los pasos sugeridos para su resolución.</p>
        </div>
      </div>

      <div className="resumen-cards">
        <article className="resumen-card critico">
          <div className="icono-card">!</div>
          <div>
            <p className="label">Errores Críticos</p>
            <h2>{totalCriticos}</h2>
          </div>
        </article>

        <article className="resumen-card resuelto">
          <div className="icono-card">✓</div>
          <div>
            <p className="label">Errores Resueltos</p>
            <h2>{totalResueltos}</h2>
          </div>
        </article>

        <article className="resumen-card tiempo">
          <div className="icono-card">⏱</div>
          <div>
            <p className="label">Últimas 24 horas</p>
            <h2>{ultimas24}</h2>
          </div>
        </article>
      </div>

      <section className="errores-recientes">
        <div className="section-header">
          <h2>Errores Recientes</h2>
        </div>

        {erroresConDiagnostico.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
            <p>No hay errores registrados. ¡Buen trabajo!</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>ID Curso</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {erroresConDiagnostico.map((error) => (
                  <tr
                    key={error.id}
                    className={error.id === errorSeleccionado?.id ? 'activo' : ''}
                    onClick={() => setSelectedError(error)}
                  >
                    <td>{error.fecha}</td>
                    <td>{error.codigo}</td>
                    <td>{error.descripcion}</td>
                    <td>{error.idCurso}</td>
                    <td>
                      <span className={`badge ${error.estado === 'Crítico' ? 'critico' : 'resuelto'}`}>
                        {error.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {errorSeleccionado && (
        <section className="detalle-incidencia">
          <h2>Detalle de Incidencia</h2>
          <div className="detalle-card">
            <div className="detalle-titulo">
              <h3>{errorSeleccionado.codigo}</h3>
              <p>{errorSeleccionado.descripcion}</p>
            </div>

            <div className="detalle-columnas">
              <div>
                <h4>Causa Técnica</h4>
                <ul>
                  {errorSeleccionado.causa.map((item, index) => (
                    <li key={`causa-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Solución Sugerida</h4>
                <ul>
                  {errorSeleccionado.solucion.map((item, index) => (
                    <li key={`solucion-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="logs-servidor">
              <div className="logs-header">
                <h4>Logs del Servidor</h4>
              </div>
              <pre>{errorSeleccionado.logs.join('\n')}</pre>
            </div>
          </div>
        </section>
      )}

      <div className="volver-boton-container">
        <button className="volver-dashboard" onClick={onBack}>
          ← Volver al Dashboard
        </button>
      </div>
    </div>
  );
}

export default RegistroErrores;
