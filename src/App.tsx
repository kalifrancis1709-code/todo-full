import { useState } from "react";

interface Tache {
  id: number;
  titre: string;
}

// etat: "Encours"
// etat: string

export default function App() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [texte, setTexte] = useState("");
  const [health, setHealth] = useState<string | null>("");
  // let index = 0;

  function ajouter() {
    if (texte.trim() === "") return;
    setTaches([...taches, { id: Date.now(), titre: texte }]);
    setTexte("");
  }

  function suppr(id: number) {
    setTaches(taches.filter((t) => t.id !== id));
  }

  function init() {
    fetch("http://localhost:3000/health")
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => console.error(err));

    refresh();
  }

  function refresh() {
    fetch("http://localhost:3000/taches")
      .then((res) => res.json())
      .then((data) => setTaches(data));
  }

  init();

  return (
    <div>
      <h1>Gestion des tâches</h1>
      <p>{health}</p>
      <input value={texte} onChange={(e) => setTexte(e.target.value)} />
      <button onClick={() => ajouter()}>Ajouter</button>

      <ul>
        {taches.map((t) => (
          <li key={t.id}>
            {t.titre}
            <button onClick={() => suppr(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
