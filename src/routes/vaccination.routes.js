import { Router } from "express";
import { methods as vaccinationController } from "../controllers/vaccination.controller";

const router = Router();

router.post("/", vaccinationController.addVaccination);
router.put("/:id", vaccinationController.updateVaccination);
router.get("/", vaccinationController.getVaccinations);
router.delete("/:id", vaccinationController.deleteVaccination);

export default router;