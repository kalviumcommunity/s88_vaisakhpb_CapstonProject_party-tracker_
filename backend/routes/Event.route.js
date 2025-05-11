// Event.route.js
import express from "express";
import { getEvent, createEvent } from "../controller/Event.controller.js";

const router = express.Router();

router.get("/", getEvent);
router.post("/", createEvent); // Add this

export default router;
