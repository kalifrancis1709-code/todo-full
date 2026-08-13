import { pool } from "./db.js";
import { enregistrerAction } from "./services.js";

export async function ajouterProduit(req, res) {
    try {
        const { nom, prix, utilisateur } = req.body;

        const result = await pool.query(
            `
            INSERT INTO produits (nom, prix)
            VALUES ($1, $2)
            RETURNING *
            `,
            [nom, prix]
        );

        const produit = result.rows[0];

        await enregistrerAction(
            "AJOUTER",
            "produits",
            produit.id,
            utilisateur
        );

        res.status(201).json({
            message: "Produit ajouté avec succès",
            produit
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur lors de l'ajout du produit"
        });
    }
}

export async function modifierProduit(req, res) {
    try {
        const { id } = req.params;
        const { nom, prix, utilisateur } = req.body;

        const result = await pool.query(
            `
            UPDATE produits
            SET nom = $1,
                prix = $2
            WHERE id = $3
            RETURNING *
            `,
            [nom, prix, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Produit introuvable"
            });
        }

        await enregistrerAction(
            "MODIFIER",
            "produits",
            id,
            utilisateur
        );

        res.json({
            message: "Produit modifié avec succès",
            produit: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur lors de la modification"
        });
    }
}

export async function supprimerProduit(req, res) {
    try {
        const { id } = req.params;
        const { utilisateur } = req.body;

        const result = await pool.query(
            `
            DELETE FROM produits
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Produit introuvable"
            });
        }

        await enregistrerAction(
            "SUPPRIMER",
            "produits",
            id,
            utilisateur
        );

        res.json({
            message: "Produit supprimé avec succès"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur lors de la suppression"
        });
    }
}