const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

let taches = [{ id: 1, titre: "Tâche de test" }];
let prochainId = 2;

// Vérifier que le serveur fonctionne
app.get("/health", (req, res) => {
  res.json("Le serveur est up !");
});

// Récupérer toutes les tâches
app.get("/taches", (req, res) => {
  res.json(taches);
});

// Ajouter une tâche
app.post("/taches", (req, res) => {
  const { titre } = req.body;

  if (!titre || titre.trim() === "") {
    return res.status(400).json({
      message: "Le titre est obligatoire",
    });
  }

  const nouvelleTache = {
    id: prochainId++,
    titre,
  };

  taches.push(nouvelleTache);

  res.status(201).json(nouvelleTache);
});

// Modifier une tâche existante
app.put("/taches/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titre } = req.body;

  if (!titre || titre.trim() === "") {
    return res.status(400).json({
      message: "Le titre est obligatoire",
    });
  }

  const tache = taches.find((t) => t.id === id);

  if (!tache) {
    return res.status(404).json({
      message: "Tâche non trouvée",
    });
  }

  tache.titre = titre;

  res.json(tache);
});

// Supprimer une tâche
app.delete("/taches/:id", (req, res) => {
  const id = Number(req.params.id);

  taches = taches.filter((t) => t.id !== id);

  res.json({
    message: "Tâche à été supprimée",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});