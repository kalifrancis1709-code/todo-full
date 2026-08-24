import { useState, useEffect } from "react";

interface Tache {
  id: number;
  designation: string;
}

export default function App() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [texte, setTexte] = useState("");
  const [health, setHealth] = useState<string | null>("");
  const [editId, setEditId] = useState<number | null>(null);

  function refresh() {
    fetch("http://localhost:3000/taches")
      .then((res) => res.json())
      .then((data) => setTaches(data));
  }

  function ajouter() {
    // if (texte.trim() === "") return;

    if (editId) {
      // Mode modification → PATCH
      fetch(`http://localhost:3000/taches/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designation: texte }),
      })
        .then((res) => res.json())
        .then(() => {
          setTexte("");
          setEditId(null); // on repasse en mode "Ajouter"
          refresh();
        })
        .catch((err) => console.error(err.message));
    } else {
      // Mode création → POST
      fetch("http://localhost:3000/taches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designation: texte }),
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then((data) => {
              alert("Erreur: " + data.message);
            });
          }
          return res.json();
        })
        .then(() => {
          setTexte("");
          refresh();
        });
    }
  }

  function modifier(idRecu: number) {
    const tacheAModifier = taches.find((t) => t.id === idRecu);

    if (!tacheAModifier) return;
    setTexte(tacheAModifier.designation);
    setEditId(idRecu);
  }

  function supprimer(id: number) {
    fetch(`http://localhost:3000/taches/${id}`, {
      method: "DELETE",
    })
      .then(() => refresh())
      .catch((err) => console.error(err));
  }

  function init() {
    fetch("http://localhost:3000/health")
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => console.error(err));

    refresh(); //TODO: à revoir
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h1>Gestion des tâches</h1>
      <p>{health}</p>
      <input value={texte} onChange={(e) => setTexte(e.target.value)} />
      <button onClick={() => ajouter()}>
        {editId ? "Valider" : "Ajouter"}
      </button>
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
  );
}
