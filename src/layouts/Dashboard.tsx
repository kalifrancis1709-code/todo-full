import { useEffect, useState } from "react";
import logo from "../assets/react.svg";

interface Tache {
  id: number;
  designation: string;
}

export default function Dashboard() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [designation, setDesignation] = useState("");
  const [texte, setTexte] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState("liste");

  function ajouter() {
    if (designation.trim() === "") {
      return;
    }

    fetch("http://localhost:3000/taches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        designation: designation,
      }),
    })
      .then(() => {
        setDesignation("");
        setPage("liste");
        refresh();
      })
      .catch((err) => console.error(err));
  }

  function modifier(idRecu: number) {
    const tacheAModifier = taches.find((t) => t.id === idRecu);

    if (!tacheAModifier) return;

    setDesignation(tacheAModifier.designation);
    setEditId(tacheAModifier.id);
    setTexte(true);
  }

  function valider() {
    if (designation.trim() === "") {
      return;
    }

    fetch(`http://localhost:3000/taches/${editId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        designation: designation,
      }),
    }).then(() => {
      setDesignation("");
      setEditId(null);
      setTexte(false);
      refresh();
    });
  }

  function annulerModification() {
    setDesignation("");
    setEditId(null);
    setTexte(false);
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
            <li
              className="menu-item"
              onClick={() => {
                setPage("liste");
                setTexte(false);
              }}
            >
              📋Liste de tâches
            </li>
            <li
              className="menu-item"
              onClick={() => {
                setPage("creation");
                setTexte(false);
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
          {page === "liste" && !texte && (
            <div>
              <h1>Liste des tâches</h1>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>DESIGNATION</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {taches.map((t, index) => (
                    <tr key={t.id}>
                      <td>{index + 1}</td>
                      <td>{t.designation}</td>
                      <td>
                        <button onClick={() => modifier(t.id)}>
                          ✍️modifier
                        </button>
                        <button onClick={() => supprimer(t.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {page === "creation" && (
            <div className="editor">
              <h1>Créer une tâche</h1>

              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />

              <button onClick={ajouter}>➕Ajouter</button>
            </div>
          )}

          {texte && (
            <div className="editor">
              <h1>Modifier la tâches</h1>

              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />

              <button onClick={valider}>☑️Valider</button>
              <button onClick={annulerModification}>✖️Annuler</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
