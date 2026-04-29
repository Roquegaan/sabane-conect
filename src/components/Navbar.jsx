// src/components/Navbar.jsx
import React, { useState } from 'react';
import '../styles/Navbar.scss';
import UserCard from './UserCard';

function Navbar({ onSearch, onClearSearch, showSearch }) {
    const [showUserCard, setShowUserCard] = useState(false);

    return (
        <nav className="navbar">
            {/* Lado Izquierdo: Nombre */}
            <span className="titulo">
                SABANA CONNECT
            </span>

            {/* Lado Derecho: Info del Usuario */}
            <div className="user-section">
                <div className="user-info">
                    usuario
                </div>
                {/* Avatar Circular */}
                <div className="avatar" onClick={() => setShowUserCard(!showUserCard)}>
                    RG
                </div>
                {showUserCard && <UserCard onClose={() => setShowUserCard(false)} />}
            </div>
        </nav>
    );
}

export default Navbar;