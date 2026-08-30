import { useEffect, useState } from "react";
import logo from "../assets/react.svg";

interface Tache {
  id: number;
  designation: string;
}

export default function Dashboard() {
  const [taches, setTaches] = useState<Tache[]>([]);

  function modifier(idRecu: number) {
    const tacheAModifier = taches.find((t) => t.id === idRecu);

    if (!tacheAModifier) return;
  }

  function supprimer(id: number) {
    fetch(`http://localhost:3000/taches/${id}`, {
      method: "DELETE",
    })
      .then(() => refresh())
      .catch((err) => console.error(err));
  }

  function init() {
    refresh(); //TODO: à revoir
  }

  function refresh() {
    fetch("http://localhost:3000/taches")
      .then((res) => res.json())
      .then((data) => setTaches(data));
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="main">
      <div className="colonne1">
        <div className="leading">
          <img src={logo} alt="Logo" />
          <span className="app-name">TODO</span>
        </div>
        <div className="side-menu">
          <ul className="menu-list">
            <li className="menu-item">Liste de tâches</li>
            <li className="menu-item">Créer une tâche</li>
          </ul>
        </div>
      </div>

      <div className="colonne2">
        <div className="menu-bar">3</div>
        <div className="main-content">
          <h1>Liste des tâches</h1>
          <div>
            <ul>
              {taches.map((t) => (
                <li key={t.id}>
                  {t.designation}
                  <button onClick={() => modifier(t.id)}>modifier</button>
                  <button onClick={() => supprimer(t.id)}>X</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
