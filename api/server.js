import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import { pool } from "./db.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await pool.query("SELECT NOW()");

        console.log("✅ PostgreSQL est disponible");

        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Impossible de se connecter à PostgreSQL");
        console.error(error);

        process.exit(1);
    }
}

startServer();