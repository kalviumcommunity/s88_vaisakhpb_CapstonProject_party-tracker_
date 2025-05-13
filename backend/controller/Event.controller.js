// Event.controller.js
import Event from '../models/Event.model.js';

export const getEvent = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ success: true, data: events, message: "Successfully launched 🚀" });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;

    if (!name || !date || !location) {
      return res.status(400).json({ success: false, message: "Name, date, and location are required" });
    }

    const newEvent = new Event({ name, date, location, description });
    await newEvent.save();

    res.status(201).json({ success: true, data: newEvent, message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// put endpoint


export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, location, description } = req.body;

    // Basic validation
    if (!name || !date || !location) {
      return res.status(400).json({ success: false, message: "Name, date, and location are required" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, date, location, description },
      { new: true } // This returns the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, data: updatedEvent, message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

