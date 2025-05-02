import express from "express"
   import {getEvent} from "../controller/Event.controller.js"

    const router=express.Router();

    router.get("/", getEvent)

    // router.post("/", createEvent);

    // router.put("/:_id", updateEvent);

    // router.delete("/:_id", deleteEvent);


    export default router;