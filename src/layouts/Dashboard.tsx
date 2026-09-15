// src/layouts/Dashboard.tsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/jwt/auth";
import react from "../assets/react.svg"; // adapte le chemin de ton logo si besoin
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const connected = isAuthenticated();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/login");
  }

  return (
    <div className="main">
      {/* ===== COLONNE GAUCHE (sidebar) ===== */}
      {connected && (
        <div className="colonne1">
          <div className="leading">
            <img src={react} alt="Logo" />
            <span className="app-name">TODO</span>
          </div>

          <div className="side-menu">
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/taches">📋 Liste de tâches</Link>
              </li>
              <li className="menu-item">
                <Link to="/taches/form">🆕 Créer une tâche</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {/* ===== COLONNE DROITE ===== */}
      <div className="colonne2">
        <div className="menu-bar">
          {/* Menu utilisateur (trois points) */}
          <div className="user-menu">
            {connected ? (
              <>
                <button
                  className="menu-button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  ⋮
                </button>

                {menuOpen && (
                  <div className="dropdown-menu">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/profil");
                      }}
                    >
                      Mon Profil
                    </button>
                    <button onClick={() => handleLogout()}>Déconnexion</button>
                  </div>
                )}
              </>
            ) : (
              <div>
                <button onClick={() => navigate("/login")}>Connexion</button>
                <button onClick={() => navigate("/signup")}>Inscription</button>
              </div>
            )}
          </div>
        </div>

        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
