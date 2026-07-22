import { useState } from "react";

type Tache = { id: number; titre: string };
// etat: "Encours"
// etat: string

export default function App() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [texte, setTexte] = useState("");
  // let index = 0;

  function ajouter() {
    if (texte.trim() === "") return;
    setTaches([...taches, { id: Date.now(), titre: texte }]);
    setTexte("");
  }

  function suppr(id: number) {
    setTaches(taches.filter((t) => t.id !== id));
  }

  return (
    <div>
      <input value={texte} onChange={(e) => setTexte(e.target.value)} />
      <button onClick={ajouter}>Ajouter</button>

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
