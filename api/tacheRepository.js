import { Router } from "express";
const router = Router();
import { prisma } from "./prisma.js";

// Récupérer toutes les tâches
router.get("/", async (req, res) => {
  const taches = await prisma.taches.findMany();
  res.json(taches);
});

// Ajouter une tâche
router.post("/", (req, res) => {
  console.log(req.body);
  const { designation: designation } = req.body;

  if (!designation || designation.trim() === "") {
    return res.status(400).json({
      message: "La designation est obligatoire",
    });
  }

  prisma.taches
    .create({
      data: {
        designation: designation,
      },
    })
    .then((result) => {
      res.json({
        message: "Tâche à été ajoutée",
      });
    });
});

// Modifier une tâche existante
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { designation } = req.body;

  if (!designation || designation.trim() === "") {
    return res.status(400).json({
      message: "La designation est obligatoire",
    });
  }

  prisma.taches
    .update({
      where: { id: id },
      data: { designation: designation },
    })
    .then((result) => {
      res.json({
        message: "Tâche à été modifiée",
      });
    });
});

// Supprimer une tâche
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  prisma.taches
    .delete({
      where: { id: id },
    })
    .then((result) => {
      res.json({
        message: "Tâche à été supprimée",
      });
    });
});

export default router;
