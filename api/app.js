import express from "express";
import cors from "cors";
import tacheRepository from "./tacheRepository.js";
import produitRoutes from "./routes.js";
import { pool } from "./db.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/taches", tacheRepository);
app.use("/produits", produitRoutes);

app.get("/health", (req, res) => {
  res.json("Le serveur est up !");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Connexion à la base de données réussie !",
      date: result.rows[0].now
    });
  } catch (err) {
    console.error("Erreur lors de la vérification de la connexion à la base de données", err);
    res.status(500).json({ message: "Erreur lors de la vérification de la connexion à la base de données" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "API Todo fonctionne !" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;