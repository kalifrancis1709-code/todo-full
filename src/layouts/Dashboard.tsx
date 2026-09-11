// src/layouts/Dashboard.tsx
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/jwt/auth";

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
    <div className="layout">
      <nav className="navbar">
        {/* Liens principaux à gauche */}
        <div className="nav-left">
          <NavLink to="/" end>
            Accueil
          </NavLink>
          <NavLink to="/taches">Tâches</NavLink>
        </div>

        {/* Menu utilisateur à droite (trois points) */}
        <div className="nav-right">
          {connected ? (
            <div className="user-menu">
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
                  <button onClick={handleLogout}>Déconnexion</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login">Connexion</NavLink>
              <NavLink to="/signup">Inscription</NavLink>
            </>
          )}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
