import { Router } from "express";
import { methods as drugController } from "../controllers/drug.controller.js";

const router = Router();

router.post("/", drugController.addDrug);
router.put("/:id", drugController.updateDrug);
router.get("/", drugController.getDrugs);
router.delete("/:id", drugController.deleteDrug);

export default router;