import app from "./app.js";
const PORT = process.env.PORT || 3000;
import { pool } from "./db.js";

// tester la connexion à la base de données
pool
  .connect()
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
