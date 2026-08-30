import { Router } from "express";
<<<<<<< HEAD

=======
>>>>>>> main
const router = Router();
import { prisma } from "./prisma.js";

// Récupérer toutes les tâches
router.get("/", async (req, res) => {
  const taches = await prisma.taches.findMany();
  res.json(taches);
});

// Ajouter une tâche
<<<<<<< HEAD
router.post("/", async (req, res) => {
=======
router.post("/", (req, res) => {
>>>>>>> main
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
<<<<<<< HEAD
        designation,
=======
        designation: designation,
>>>>>>> main
      },
    })
    .then((result) => {
      res.json({
<<<<<<< HEAD
        message: "Tâche a été ajoutée",
=======
        message: "Tâche à été ajoutée",
>>>>>>> main
      });
    });
});

<<<<<<< HEAD
// // Modifier une tâche existante
=======
// Modifier une tâche existante
>>>>>>> main
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { designation } = req.body;

  if (!designation || designation.trim() === "") {
    return res.status(400).json({
<<<<<<< HEAD
      message: "Le titre est obligatoire",
=======
      message: "La designation est obligatoire",
>>>>>>> main
    });
  }

  prisma.taches
    .update({
<<<<<<< HEAD
      where: { id },
      data: { designation },
    })
    .then((result) => {
      res.json({
        message: "Tâche a été modifiée",
=======
      where: { id: id },
      data: { designation: designation },
    })
    .then((result) => {
      res.json({
        message: "Tâche à été modifiée",
>>>>>>> main
      });
    });
});

<<<<<<< HEAD
// // Supprimer une tâche
=======
// Supprimer une tâche
>>>>>>> main
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  prisma.taches
    .delete({
      where: { id: id },
    })
    .then((result) => {
      res.json({
<<<<<<< HEAD
        message: "Tâche a été supprimée",
=======
        message: "Tâche à été supprimée",
>>>>>>> main
      });
    });
});

export default router;
