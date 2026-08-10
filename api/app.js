import express from "express";
import cors from "cors";
import tacheRepository from "./tacheRepository.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/taches", tacheRepository);

// Vérifier que le serveur fonctionne
app.get("/health", (req, res) => {
  res.json("Le serveur est up !");
});

export default app;
