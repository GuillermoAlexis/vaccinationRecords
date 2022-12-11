import { Router } from "express";
import { methods as drugController } from "../controllers/drug.controller";

const router = Router();

router.post("/", drugController.addDrug);
router.put("/:id", drugController.updateDrug);

export default router;