import {Router} from "express";
import { query } from "./db.js";
const router = Router();
let taches = [{ id: 1, titre: "Tâche 1" }];

// Récupérer toutes les tâches
router.get("/", (req, res) => {
 query("SELECT * FROM taches").then((result) => {
    res.json(result.rows);
 })

});
// Ajouter une tâche
router.post("/taches", (req, res) => {

  const { designation } = req.body;

  if (!designation || designation.trim() === "") {
    return res.status(400).json({
      message: "La designation est obligatoire",
    
    });
  }

  const nouvelleTache = {
    id: prochainId++,
    designation,
  };

  taches.push(nouvelleTache);

  res.status(201).json(nouvelleTache);
});

// Modifier une tâche existante
router.put("/", (req, res) => {
  const id = Number(req.params.id);
  const { designation } = req.body;

  if (!designation || designation.trim() === "") {
    return res.status(400).json({
      message: "La designation est obligatoire",
    });
  }

  const tache = taches.find((t) => t.id === id);

  if (!tache) {
    return res.status(404).json({
      message: "Tâche non trouvée",
    });
  }

  tache.designation = designation  ;

  res.json(tache);
});

// Supprimer une tâche
router.delete("/", (req, res) => {
  const id = Number(req.params.id);

  taches = taches.filter((t) => t.id !== id);

  res.json({
    message: "Tâche à été supprimée",
  });
});
export default router;
