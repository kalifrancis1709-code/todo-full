import { useEffect, useState } from "react";

interface Tache {
  id: number;
  titre: string;
}

export default function App() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [texte, setTexte] = useState("");
  const [health, setHealth] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  function init() {
    fetch("http://localhost:3000/health")
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((err) => setHealth(err.message || "Erreur de connexion"));
  }

  function refresh() {
    fetch("http://localhost:3000/taches")
      .then((res) => res.json())
      .then((data) => setTaches(data))
      .catch((err) => console.error(err));
  }

  function ajouter() {
    if (texte.trim() === "") return;

    fetch("http://localhost:3000/taches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titre: texte,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setTexte("");
        refresh();
      })
      .catch((err) => console.error(err));
  }

  function supprimer(id: number) {
    fetch(`http://localhost:3000/taches/${id}`, {
      method: "DELETE",
    })
      .then(() => refresh())
      .catch((err) => console.error(err));
  }

  function modifier(): void {
    fetch(`http://localhost:3000/taches/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titre: editingText }),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingId(null);
        setEditingText("");
        refresh();
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    init();
    refresh();
  }, []);

  return (
    <div>
      <h1>Gestion des tâches</h1>

      <p>{health}</p>

      <input
        type="text"
        value={texte}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTexte(e.target.value)
        }
      />

      <button onClick={ajouter}>Ajouter</button>

      <ul>
        {taches.map((t: Tache) => (
          <li key={t.id}>
            {editingId === t.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditingText(e.target.value)
                  }
                />

                <button onClick={modifier}>Enregistrer</button>

                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingText("");
                  }}
                >
                  Annuler
                </button>
              </>
            ) : (
              <>
                {t.titre}

                <button
                  onClick={() => {
                    setEditingId(t.id);
                    setEditingText(t.titre);
                  }}
                >
                  Modifier
                </button>

                <button onClick={() => supprimer(t.id)}>X</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
