import { Outlet } from "react-router-dom";
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
            <li className="menu-item" onClick={() => {}}>
              📋Liste de tâches
            </li>
            <li
              className="menu-item"
              onClick={() => {
                setEditId(null);
                setPage("creation");
                setDesignation("");
              }}
            >
              🆕Créer une tâche
            </li>
          </ul>
        </div>
      </div>

      <div className="colonne2">
        <div className="menu-bar">3</div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
