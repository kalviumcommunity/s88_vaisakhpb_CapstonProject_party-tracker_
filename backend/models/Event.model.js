// backend/models/Event.js

import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Event = mongoose.model('event',eventSchema);

export default Event;