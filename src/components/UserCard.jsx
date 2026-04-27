import React from 'react';
import '../styles/UserCard.scss';

function UserCard({ onClose }) {
    return (
        <div className="user-card">
            {/* Avatar Circular Pequeño */}
            <div className="user-card-avatar">
                RG
            </div>

            {/* Título */}
            <h3 className="user-card-title">Perfil de Aprendiz</h3>

            {/* Texto */}
            <p className="user-card-text">Etapa Práctica - SENA</p>

            {/* Botón de Cerrar Sesión */}
            <button className="user-card-logout" onClick={onClose}>
                Cerrar Sesión
            </button>
        </div>
    );
}

export default UserCard;