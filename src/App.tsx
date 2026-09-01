import { useState, useEffect } from "react";
import Dashboard from "./layouts/Dashboard";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TachesList from "./pages/TachesList";
import TachesForm from "./pages/TachesForm";

interface Tache {
  id: number;
  designation: string;
}

export default function App() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const [texte, setTexte] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [health, setHealth] = useState<string>("");

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
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
<<<<<<< HEAD
          <Route path="taches" element={<TachesList />} />
          <Route path="/taches/form" element={<TachesForm />} />
          <Route path="/taches/form/:id" element={<TachesForm />} />
=======
          <Route path="/taches" element={<TachesList />}></Route>
          <Route path="/taches/form" element={<TachesForm />}></Route>
          <Route path="/taches/form/:id" element={<TachesForm />}></Route>
>>>>>>> main
        </Route>
      </Routes>
    </>
  );
}
