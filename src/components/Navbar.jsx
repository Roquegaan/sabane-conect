// src/components/Navbar.jsx
import React from 'react';

function Navbar() {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between', // Separa el logo del perfil
            alignItems: 'center',
            padding: '15px 80px', // Alineado con el padding de tu contenedor principal
            backgroundColor: 'white',
            borderBottom: '1px solid #e0e0e0',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {/* Lado Izquierdo: Logo y Nombre */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img
                    src="/unisabana-logo.png" // Asegúrate de tener el logo en la carpeta public
                    alt="Logo"
                    style={{ height: '35px' }}
                />
                <span style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#003366', // Color institucional
                    letterSpacing: '1px'
                }}>
                    SABANA CONNECT
                </span>
            </div>

            {/* Lado Derecho: Info del Usuario */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'right' }}>
                <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>usuario</div>
                </div>
                {/* Avatar Circular */}
                <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#003366',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                }}>
                    RG
                </div>
            </div>
        </nav>
    );
}

export default Navbar;