import Fleet from "../models/Fleet.js";
import { isDbConnected } from "../config/db.js";
import { fleetSeedData } from "../data/fleetSeedData.js";

export async function getFleet(req, res) {
  try {
    if (isDbConnected()) {
      let fleet = await Fleet.find().sort({ order: 1 });
      if (!fleet.length) {
        fleet = await Fleet.insertMany(fleetSeedData);
      }
      return res.json(fleet);
    }

    const sorted = [...fleetSeedData].sort((a, b) => a.order - b.order);
    return res.json(sorted);
  } catch (err) {
    console.error("[fleetController] getFleet error:", err.message);
    res.status(500).json({ message: "Failed to fetch fleet", error: err.message });
  }
}

export async function getFleetBySlug(req, res) {
  try {
    const { slug } = req.params;

    if (isDbConnected()) {
      const vehicle = await Fleet.findOne({ slug });
      if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
      return res.json(vehicle);
    }

    const vehicle = fleetSeedData.find((v) => v.slug === slug);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    return res.json(vehicle);
  } catch (err) {
    console.error("[fleetController] getFleetBySlug error:", err.message);
    res.status(500).json({ message: "Failed to fetch vehicle", error: err.message });
  }
}
