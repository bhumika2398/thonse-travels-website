import Booking from "../models/Booking.js";
import { isDbConnected } from "../config/db.js";
import { appendJSONRecord, readJSONFile } from "../utils/jsonStore.js";

const FILE = "bookings.json";

export async function createBooking(req, res) {
  try {
    const {
      name,
      phone,
      email,
      vehicle,
      pickupLocation,
      destination,
      date,
      passengers,
      notes,
    } = req.body;

    if (!name || !phone || !vehicle || !date) {
      return res.status(400).json({
        message: "Name, phone, vehicle and date are required to make a booking.",
      });
    }

    const record = {
      name,
      phone,
      email: email || "",
      vehicle,
      pickupLocation: pickupLocation || "",
      destination: destination || "",
      date,
      passengers: passengers || "",
      notes: notes || "",
      status: "pending",
    };

    if (isDbConnected()) {
      const booking = await Booking.create(record);
      return res.status(201).json({
        message: "Booking received! Our team will confirm shortly.",
        booking,
      });
    }

    const saved = appendJSONRecord(FILE, {
      id: Date.now().toString(),
      ...record,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({
      message: "Booking received! Our team will confirm shortly.",
      booking: saved,
    });
  } catch (err) {
    console.error("[bookingController] createBooking error:", err.message);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
}

export async function getBookings(req, res) {
  try {
    if (isDbConnected()) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json(bookings);
    }
    const bookings = readJSONFile(FILE, []);
    return res.json([...bookings].reverse());
  } catch (err) {
    console.error("[bookingController] getBookings error:", err.message);
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
}
