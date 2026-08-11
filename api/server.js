import app from "./app.js";
const PORT = process.env.PORT || 3000;
import { pool } from "./db.js";


// tester la connecxion à la base de données
pool.connect((err, client, release) => {
  if (err) {
    console.error("Erreur de connexion à la base de données", err);
    return;
  }
  console.log("Connexion à la base de données réussie");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;