import { Router } from "express";
import {
  ajouterProduit,
  modifierProduit,
  supprimerProduit
} from "./controller.js"; // chemin à vérifier

const router = Router();

router.post("/", ajouterProduit);
router.put("/:id", modifierProduit);
router.delete("/:id", supprimerProduit);

export default router;