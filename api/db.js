import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const poolConfig = process.env.DATABASE_URL
    ? {
          connectionString: process.env.DATABASE_URL,
          ssl: {
              rejectUnauthorized: false
          }
      }
    : {
          host: process.env.DB_HOST || "localhost",
          port: process.env.DB_PORT || 5432,
          database: process.env.DB_NAME,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD
      };

const pool = new Pool(poolConfig);

pool.on("connect", () => {
    console.log("✅ Connexion à PostgreSQL réussie");
});

pool.on("error", (err) => {
    console.error("❌ Erreur PostgreSQL :", err);
});

async function query(text, params) {
    return pool.query(text, params);
}

export { pool, query };