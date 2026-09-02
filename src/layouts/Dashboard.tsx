import { Link, Outlet } from "react-router-dom";
import logo from "../assets/react.svg";

export default function Dashboard() {
  return (
    <div className="main">
      <div className="colonne1">
        <div className="leading">
          <img src={logo} alt="Logo" />
          <span className="app-name">TODO</span>
        </div>
        <div className="side-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/taches">📋Liste de tâches</Link>
            </li>
            <li className="menu-item">
              <Link to="/taches/form">🆕Créer une tâche</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="colonne2">
        <div className="menu-bar">
          3
          <div>
            <button>Connexion</button>
            <button>Inscrisption</button>
          </div>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
