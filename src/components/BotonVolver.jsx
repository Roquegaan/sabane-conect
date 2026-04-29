import React from 'react';
import '../styles/BotonVolver.scss';

function BotonVolver({ texto = 'Volver al inicio', onClick }) {
    return (
        <button
            className="boton-volver"
            onClick={onClick}
            type="button"
        >
            <span className="flecha">←</span>
            <span className="texto">{texto}</span>
        </button>
    );
}

export default BotonVolver;