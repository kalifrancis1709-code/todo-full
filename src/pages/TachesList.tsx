import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../auth/jwt/auth";
import type { Tache } from "../Interfaces/Tache";

export default function TachesList() {
  const [taches, setTaches] = useState<Tache[]>([]);
  const navigate = useNavigate();

  function modifier(idRecu: number) {
    console.log("modifier :" + idRecu);
    navigate(`/taches/form/${idRecu}`);
  }

  function init() {
    refresh(); //TODO: à revoir
  }

  function refresh() {
    fetch("http://localhost:3000/taches", {
      headers: getAuthHeader(),
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return Promise.reject("Non authentifié");
        }
        if (!res.ok) {
          return Promise.reject(
            `Erreur lors de la récupération des tâches:${res.status}`,
          );
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTaches(data);
        } else {
          console.error("Données reçues non valides:", data);
          setTaches([]);
        }
      })
      .catch((err) => console.error(err));
  }

  function supprimer(id: number) {
    fetch(`http://localhost:3000/taches/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
        }
        refresh();
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="page-main">
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
              <td>
                {t.designation} -- {t.id}
              </td>
              <td>
                <div className="actions">
                  <button onClick={() => modifier(t.id)}>✍️modifier</button>
                  <button onClick={() => supprimer(t.id)}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
