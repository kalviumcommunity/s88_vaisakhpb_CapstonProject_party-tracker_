import express from "express";
import { getEvent, createEvent, updateEvent } from "../controller/Event.controller.js";

const router = express.Router();

router.get("/", getEvent);
router.post("/", createEvent);
router.put("/:id", updateEvent); // ← New route added here

export default router;
