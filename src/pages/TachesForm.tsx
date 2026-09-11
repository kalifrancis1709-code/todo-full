import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TachesForm() {
  const [designation, setDesignation] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  function ajouter() {
    if (designation.trim() === "") {
      return;
    }

    fetch("http://localhost:3000/taches", {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({
        designation: designation,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return Promise.reject("Non authentifié");
        }
        setDesignation("");
        navigate(-1);
      })
      .catch((err) => console.error(err));
  }

  function valider() {
    if (designation.trim() === "") {
      return;
    }

    fetch(`http://localhost:3000/taches/${id}`, {
      method: "PATCH",
      headers: getAuthHeader(),
      body: JSON.stringify({
        designation: designation,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return Promise.reject("Non authentifié");
        }
        setDesignation("");
        navigate(-1);
      })
      .catch((err) => console.error(err));
  }

  function annulerModification() {
    setDesignation("");
    navigate(-1);
  }

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/taches/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDesignation(data.designation);
      });
  }, [id]);

  return (
    <div>
      {!id && (
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

      {id && (
        <div className="editor">
          <h1>Modifier la tâche</h1>
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
  );
}
