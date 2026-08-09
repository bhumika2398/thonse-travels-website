import { Router } from "express";
import { getFleet, getFleetBySlug } from "../controllers/fleetController.js";

const router = Router();

router.get("/", getFleet);
router.get("/:slug", getFleetBySlug);

export default router;
