import { Router } from "express";
import { methods as vaccinationController } from "../controllers/vaccination.controller";

const router = Router();

router.post("/", vaccinationController.addVaccinations);

export default router;