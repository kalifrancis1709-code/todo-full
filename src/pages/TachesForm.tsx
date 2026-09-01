import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

<<<<<<< HEAD
export default function TacheForm() {
=======
export default function TachesForm() {
>>>>>>> main
  const [designation, setDesignation] = useState("");
  const { id } = useParams<{ id: string }>();

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
      })
      .catch((err) => console.error(err));
  }

  function valider() {
    if (designation.trim() === "") {
      return;
    }

<<<<<<< HEAD
    fetch(`http://localhost:3000/taches/${id}`, {
=======
    fetch(`http://localhost:3000/taches/${editId}`, {
>>>>>>> main
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        designation: designation,
      }),
    }).then(() => {
      setDesignation("");
    });
  }

  function annulerModification() {
    setDesignation("");
  }

  useEffect(() => {
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
  );
}
