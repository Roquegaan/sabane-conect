// src/components/Navbar.jsx
import React from 'react';
import '../styles/Navbar.scss';

function Navbar() {
    return (
        <nav className="navbar">
            {/* Lado Izquierdo: Logo y Nombre */}
            <div className="logo-section">
                <img
                    src="/unisabana-logo.png" // Asegúrate de tener el logo en la carpeta public
                    alt="Logo"
                    className="logo"
                />
                <span className="titulo">
                    SABANA CONNECT
                </span>
            </div>

            {/* Lado Derecho: Info del Usuario */}
            <div className="user-section">
                <div className="user-info">
                    usuario
                </div>
                {/* Avatar Circular */}
                <div className="avatar">
                    RG
                </div>
            </div>
        </nav>
    );
}

export default Navbar;