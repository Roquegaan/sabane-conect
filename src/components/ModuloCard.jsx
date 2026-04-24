// ModuloCard.jsx - Reemplaza tu componente con este

function ModuloCard({ icono, titulo, descripcion, textoBoton, onclick, disabled, loading, esAlerta }) {
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
            {/* Icono */}
            <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: esAlerta ? '#FEF3C7' : '#1B3A6B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
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

            {/* Título */}
            <h2 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#111827',
                margin: 0,
                fontFamily: 'system-ui, sans-serif',
            }}>
                {titulo}
            </h2>

            {/* Descripción */}
            <p style={{
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: '1.6',
                margin: 0,
                flexGrow: 1,
            }}>
                {descripcion}
            </p>

            {/* Botón */}
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
                    // Estilo según tipo
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

export default ModuloCard;