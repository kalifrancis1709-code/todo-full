import app from "./app.js";

const PORT = process.env.PORT || 3000;

import { pool } from "./db.js";

// tester le connection à la data base
pool
  .connect()
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1); // Arrêter le serveur si la connexion échoue
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
