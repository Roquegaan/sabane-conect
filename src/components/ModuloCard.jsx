// src/components/ModuloCard.jsx
function ModuloCard({ icono, titulo, descripcion, textoBoton, esAlerta }) {
    const estiloBoton = {
        backgroundColor: esAlerta ? 'transparent' : '#003366',
        color: esAlerta ? '#cc0000' : 'white',
        border: esAlerta ? '1px solid #cc0000' : 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '100%',
        marginTop: 'auto'
    };

    return (
        <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '24px',
            width: '370px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            backgroundColor: 'white'
        }}>
            <div style={{ fontSize: '24px', marginBottom: '16px' }}>{icono}</div>
            <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>{titulo}</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px' }}>
                {descripcion}
            </p>
            <button style={estiloBoton}>{textoBoton}</button>
        </div>
    );
}

export default ModuloCard;