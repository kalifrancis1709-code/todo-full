import { Router } from "express";
import { query } from "./db.js";

const router = Router();

// Récupérer toutes les tâches
router.get("/", (req, res) => {
  query("SELECT * FROM taches").then((result) => {
    res.json(result.rows);
  });
});

// Ajouter une tâche
router.post("/", (req, res) => {
  const { designation: designation } = req.body;

  if (!designation || designation.trim() === "") {
    return res.status(400).json({
      message: "La designation est obligatoire",
    });
  }

  query("INSERT INTO taches (designation) VALUES($1)", [designation]).then(
    (result) => {
      res.json(result.rows);
    },
  );

  //   res.status(201).json({
  //     message: "tache à été ajouter",
  //   });
});

// Modifier une tâche existante
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { designation } = req.body;

  if (!designation || designation.trim() === "") {
    return res.status(400).json({
      message: "Le titre est obligatoire",
    });
  }

  query("UPDATE taches SET designation = $1 WHERE id = $2", [
    designation,
    id,
  ]).then((result) => {
    res.json({
      message: "Tache à été modifié",
    });
  });
});

// Supprimer une tâche
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  query("DELETE FROM taches WHERE id = $1", [id]).then(() => {
    res.json({
      message: "Tâche à été supprimée",
    });
  });
});

export default router;
