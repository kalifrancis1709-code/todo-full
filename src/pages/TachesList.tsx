import { useEffect, useState } from "react";
import type { Tache } from "../Interfaces/Tache";

export default function TachesList() {
  const [taches, setTaches] = useState<Tache[]>([]);

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

  function modifier(idRecu: number) {
    console.log("modifier :" + idRecu);
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

  return (
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
                <button onClick={() => modifier(t.id)}>✍️modifier</button>
                <button onClick={() => supprimer(t.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
