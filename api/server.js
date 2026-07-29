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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
