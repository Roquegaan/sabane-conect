// ModuloCard.jsx - Reemplaza tu componente con este
import '../styles/ModuloCard.scss';

function ModuloCard({ icono, titulo, descripcion, textoBoton, onclick, disabled, loading, esAlerta }) {
    return (
        <div className="modulo-card">
            {/* Icono */}
            <div className={`icono ${esAlerta ? 'alerta' : 'normal'}`}>
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

            {/* Título */}
            <h2 className="titulo">
                {titulo}
            </h2>

            {/* Descripción */}
            <p className="descripcion">
                {descripcion}
            </p>

            {/* Botón */}
            <button
                onClick={onclick}
                disabled={disabled}
                className={`boton ${esAlerta ? 'alerta' : 'normal'}`}
            >
                {loading ? 'Cargando...' : textoBoton} →
            </button>
        </div>
    );
}

export default ModuloCard; 