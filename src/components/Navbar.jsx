// src/components/Navbar.jsx
import React, { useState } from 'react';
import '../styles/Navbar.scss';
import UserCard from './UserCard';

function Navbar({ onSearch, onClearSearch, showSearch }) {
    const [showUserCard, setShowUserCard] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchValue.trim());
        }
    };

    const handleClear = () => {
        setSearchValue('');
        onClearSearch();
    };

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

            {showSearch && (
                <div className="search-section">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Buscar ID SIGA..."
                        className="search-input"
                    />
                    {searchValue && (
                        <button
                            type="button"
                            className="clear-search"
                            onClick={handleClear}
                            aria-label="Limpiar búsqueda"
                        >
                            ×
                        </button>
                    )}
                </div>
            )}

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