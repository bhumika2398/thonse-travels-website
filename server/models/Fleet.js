import mongoose from "mongoose";

const fleetSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline2: { type: String },
    seats: { type: Number },
    passengerCapacity: { type: String },
    image: { type: String, required: true },
    tagline: { type: String },
    highlights: { type: [String], default: [] },
    priceFrom: { type: Number },
    priceUnit: { type: String, default: "per km" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Fleet", fleetSchema);
