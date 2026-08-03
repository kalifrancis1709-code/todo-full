<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> main

interface Tache {
  id: number;
  titre: string;
}

export default function App() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [texte, setTexte] = useState("");
<<<<<<< HEAD
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

=======
  const [health, setHealth] = useState<string | null>("");
  const [editId, setEditId] = useState<number | null>(null);
>>>>>>> main
  function ajouter() {
    if (texte.trim() === "") return;

    if (editId) {
      // Mode modification → PUT
      fetch(`http://localhost:3000/taches/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titre: texte }),
      })
        .then((res) => res.json())
        .then(() => {
          setTexte("");
          setEditId(null); // on repasse en mode "Ajouter"
         refresh();
        })
        .catch((err) => console.error(err));
    } else {
      // Mode création → POST
      fetch("http://localhost:3000/taches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titre: texte }),
      })
        .then((res) => res.json())
        .then(() => {
          setTexte("");
          refresh();
        })
        .catch((err) => console.error(err));
    }
  }

  function modifier(id: number) {
    const tache = taches.find((t) => t.id === id);
    if (!tache) return;
    setTexte(tache.titre);
    setEditId(id);
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
<<<<<<< HEAD
  }

  useEffect(() => {
    init();
    refresh();
  }, []);
=======
    refresh();
  }

   useEffect(() => {
    init();
  }, []); 

  function refresh() {
    fetch("http://localhost:3000/taches")
      .then((res) => res.json())
      .then((data) => setTaches(data));
  }
>>>>>>> main

  return (
    <div>
      <h1>Gestion des tâches</h1>

      <p>{health}</p>
<<<<<<< HEAD

      <input
        type="text"
        value={texte}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTexte(e.target.value)
        }
      />

      <button onClick={ajouter}>Ajouter</button>

=======
      <input value={texte} onChange={(e) => setTexte(e.target.value)} />
      <button onClick={() => ajouter()}>{editId ? "Valider" : "Ajouter"}</button>
>>>>>>> main
      <ul>
        {taches.map((t: Tache) => (
          <li key={t.id}>
<<<<<<< HEAD
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
=======
            {t.titre}
            <button onClick={() => modifier(t.id)}>modifier</button>
            <button onClick={() => supprimer(t.id)}>X</button>
>>>>>>> main
          </li>
        ))}
      </ul>
    </div>
  );
}