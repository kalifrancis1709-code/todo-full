const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

let taches = [{ id: 1, titre: "Taches de test" }];

app.get("/health", async (req, res) => {
  res.json("le serveur est up!");
});

app.get("/taches", async (req, res) => {
  res.json(taches);
});

app.post("/taches", async (req, res) => {
  const titre = req.body;

  if (!titre) {
    return res.status(400).json({ message: "titre obligatoire" });
  }

  const nouvelleTache = {
    id: Date.now(),
    titre,
  };

  taches.push(nouvelleTache);

  res.status(201).json(nouvelleTache);
});

app.delete("/taches/:id", (req, res) => {
  const id = Number(req.params.id);

  taches = taches.filter((t) => t.id !== id);

  res.json({
    message: "supprimé",
  });
});

app.put("/taches/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titre } = req.body;

  const tache = taches.find((t) => t.id === id);

  if (!tache) {
    return res.status(404).json({ message: "Not found" });
  }

  tache.titre = titre;

  res.json(tache);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
