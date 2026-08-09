import { Router } from "express";
import { chatbotReply } from "../controllers/chatbotController.js";

const router = Router();

router.post("/", chatbotReply);

export default router;
