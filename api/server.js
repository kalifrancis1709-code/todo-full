// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
// let taches = [{id: 1, titre: "Taches de test"}];

// app.get("/health", async (req, res) => {
//   res.json("le serveur est up!");
// });

// app.get("/health", async (req, res) => {
//   res.json(taches);
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

let taches = [];

app.get("/health", async (req, res) => {
  res.json("le serveur est up!");
});

app.get("/taches", async (req, res) => {
  res.json(taches);
});

app.post("/taches", (req, res) => {
  const titre = req.body;

  if (!titre) {
    return res.status(400).json({ message: "le corps est vide" });
  }

  const nouvelleTache = { id: Date.now(), titre: titre.titre };

  taches.push(nouvelleTache);
  res.json(nouvelleTache);
});

app.delete("/taches/:id", (req, res) => {
  const id = Number(req.params.id);

  taches = taches.filter((t) => t.id !== id);
  res.json({ message: "Tâche supprimée" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
